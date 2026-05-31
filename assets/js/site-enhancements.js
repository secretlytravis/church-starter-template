(function() {
  // Shared progressive enhancements for every page that loads this file.
  // Pages still render without JavaScript; this layer adds accessibility,
  // navigation behavior, the next-gathering banner, and search metadata.

  function currentPage() {
    var path = window.location.pathname.split('/').pop();
    return path || 'index.html';
  }

  // Adds a keyboard-only skip link so visitors can jump past navigation.
  function addSkipLink() {
    if (document.querySelector('.skip-link')) return;
    var main = document.querySelector('main');
    if (!main) return;
    if (!main.id) main.id = 'main-content';
    var link = document.createElement('a');
    link.className = 'skip-link';
    link.href = '#' + main.id;
    link.textContent = 'Skip to main content';
    document.body.insertBefore(link, document.body.firstChild);
  }

  // Marks the current navigation item for screen readers and styling hooks.
  function highlightCurrentNav() {
    var page = currentPage();
    Array.prototype.forEach.call(document.querySelectorAll('nav a[href], .mobile-menu a[href]'), function(link) {
      var href = link.getAttribute('href');
      if (!href || href.indexOf('http') === 0 || href.indexOf('#') === 0 || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;
      var target = href.split('#')[0].split('/').pop() || 'index.html';
      if (target === page) link.setAttribute('aria-current', 'page');
    });
  }

  window.toggleMenu = window.toggleMenu || function(btn) {
    var menu = document.getElementById('mobileMenu');
    if (!menu) return;
    var open = menu.classList.toggle('open');
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  window.closeMenu = window.closeMenu || function() {
    var menu = document.getElementById('mobileMenu');
    var btn = document.querySelector('.hamburger');
    if (menu) menu.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  };

  // Wires up the hamburger menu, outside-click closing, and keyboard-friendly
  // dropdown behavior. The data attributes prevent duplicate listeners.
  function enableNavInteractions() {
    var menu = document.getElementById('mobileMenu');
    var btn = document.querySelector('.hamburger');

    if (btn && !btn.hasAttribute('data-enhanced-menu')) {
      btn.setAttribute('data-enhanced-menu', 'true');
      btn.addEventListener('click', function() { window.toggleMenu(btn); });
    }

    document.addEventListener('click', function(event) {
      if (!menu || !btn || !menu.classList.contains('open')) return;
      if (!menu.contains(event.target) && !btn.contains(event.target)) window.closeMenu();
    });

    Array.prototype.forEach.call(document.querySelectorAll('.nav-dropdown'), function(dropdown) {
      var toggle = dropdown.querySelector('a');
      if (!toggle || dropdown.hasAttribute('data-enhanced-dropdown')) return;
      dropdown.setAttribute('data-enhanced-dropdown', 'true');
      toggle.setAttribute('aria-haspopup', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      dropdown.addEventListener('mouseenter', function() {
        dropdown.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      });
      dropdown.addEventListener('mouseleave', function() {
        dropdown.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
      dropdown.addEventListener('focusin', function() {
        dropdown.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      });
      dropdown.addEventListener('focusout', function(event) {
        if (!dropdown.contains(event.relatedTarget)) {
          dropdown.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // If /assets/data/site-events.json fails to load, these regular weekly gatherings keep
  // the banner useful instead of leaving the bottom of the page empty.
  var fallbackEvents = {
    location: '123 Church Street, Your City',
    weekly: [
      { title: 'Sunday School', day: 0, time: '09:15', endTime: '10:15', ctaLabel: 'Plan Visit', ctaHref: '/pages/plan-your-visit.html' },
      { title: 'Worship', day: 0, time: '10:30', endTime: '12:00', ctaLabel: 'Plan Visit', ctaHref: '/pages/plan-your-visit.html' },
      { title: 'Wednesday Bible Study', day: 3, time: '18:00', endTime: '19:00', ctaLabel: 'Plan Visit', ctaHref: '/pages/plan-your-visit.html' }
    ],
    special: []
  };

  function parseTimeOnDate(date, time) {
    var parts = String(time || '00:00').split(':');
    var result = new Date(date);
    result.setHours(Number(parts[0] || 0), Number(parts[1] || 0), 0, 0);
    return result;
  }

  function formatTime(time) {
    var parts = String(time || '00:00').split(':');
    var date = new Date();
    date.setHours(Number(parts[0] || 0), Number(parts[1] || 0), 0, 0);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }

  function formatDate(date) {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }

  // Converts a weekly event definition into the next real date/time it occurs.
  function buildWeeklyOccurrence(event, now) {
    var daysUntil = (Number(event.day) - now.getDay() + 7) % 7;
    var date = new Date(now);
    date.setDate(now.getDate() + daysUntil);
    var startsAt = parseTimeOnDate(date, event.time);
    var endsAt = parseTimeOnDate(date, event.endTime || event.time);
    if (endsAt <= startsAt) endsAt.setHours(startsAt.getHours() + 1);
    if (endsAt <= now) {
      startsAt.setDate(startsAt.getDate() + 7);
      endsAt.setDate(endsAt.getDate() + 7);
    }
    return Object.assign({}, event, { startsAt: startsAt, endsAt: endsAt });
  }

  // Special events are one-time dated events and are ignored after they end.
  function buildSpecialOccurrence(event, now) {
    if (!event.date || !event.time) return null;
    var startsAt = parseTimeOnDate(new Date(event.date + 'T00:00:00'), event.time);
    var endsAt = parseTimeOnDate(startsAt, event.endTime || event.time);
    if (endsAt <= startsAt) endsAt.setHours(startsAt.getHours() + 1);
    if (endsAt <= now) return null;
    return Object.assign({}, event, { startsAt: startsAt, endsAt: endsAt });
  }

  // Combines weekly and special events, then picks the soonest upcoming one.
  function getNextEvent(calendar) {
    var now = new Date();
    var weekly = (calendar.weekly || []).map(function(event) { return buildWeeklyOccurrence(event, now); });
    var special = (calendar.special || []).map(function(event) { return buildSpecialOccurrence(event, now); }).filter(Boolean);
    return weekly.concat(special).sort(function(a, b) { return a.startsAt - b.startsAt; })[0];
  }

  // Creates the dismissible "Next Gathering" banner shown across the site.
  function renderEventBanner(calendar) {
    if (sessionStorage.getItem('hideThisSundayBanner') === 'true') return;
    if (document.querySelector('.this-sunday')) return;
    var nextEvent = getNextEvent(calendar || fallbackEvents);
    if (!nextEvent) return;
    var location = nextEvent.location || (calendar && calendar.location) || fallbackEvents.location;
    var dateLabel = formatDate(nextEvent.startsAt);
    var timeLabel = formatTime(nextEvent.time);
    var ctaLabel = nextEvent.ctaLabel || 'Plan Visit';
    var ctaHref = nextEvent.ctaHref || '/pages/plan-your-visit.html';
    var banner = document.createElement('aside');
    banner.className = 'this-sunday';
    banner.setAttribute('aria-label', 'Next gathering at Example Church');
    banner.innerHTML = [
      '<div class="this-sunday-inner">',
      '<div class="this-sunday-text"><strong>Next Gathering</strong><span class="this-sunday-date">' + dateLabel + '</span><span>' + nextEvent.title + ' ' + timeLabel + '</span><span>' + location + '</span></div>',
      '<div class="this-sunday-actions"><a href="' + ctaHref + '">' + ctaLabel + '</a><a href="/pages/sermons.html">Sermons</a><button type="button" aria-label="Dismiss this Sunday banner">&times;</button></div>',
      '</div>'
    ].join('');
    banner.querySelector('button').addEventListener('click', function() {
      sessionStorage.setItem('hideThisSundayBanner', 'true');
      banner.remove();
      document.body.classList.remove('has-this-sunday');
    });
    document.body.appendChild(banner);
    document.body.classList.add('has-this-sunday');
  }

  // Loads editable event data first, then falls back to built-in weekly times.
  function addThisSundayBanner() {
    fetch('/assets/data/site-events.json', { cache: 'no-store' })
      .then(function(response) {
        if (!response.ok) throw new Error('Calendar not available');
        return response.json();
      })
      .then(renderEventBanner)
      .catch(function() { renderEventBanner(fallbackEvents); });
  }

  // Adds Schema.org church data so search engines understand the organization,
  // address, contact information, and usual gathering times.
  function addStructuredData() {
    if (document.getElementById('grace-structured-data')) return;
    var data = {
      '@context': 'https://schema.org',
      '@type': 'Church',
      name: 'Example Church',
      url: 'https://examplechurch.org/',
      image: 'https://examplechurch.org/assets/images/social-card-placeholder.svg',
      telephone: '+1-555-555-5555',
      email: 'hello@examplechurch.org',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Church Street',
        addressLocality: 'Your City',
        addressRegion: 'ST',
        postalCode: '00000',
        addressCountry: 'US'
      },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '09:15', closes: '12:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '18:00', closes: '19:00' }
      ]
    };
    var script = document.createElement('script');
    script.id = 'grace-structured-data';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  document.addEventListener('DOMContentLoaded', function() {
    addSkipLink();
    highlightCurrentNav();
    enableNavInteractions();
    addThisSundayBanner();
    addStructuredData();
  });
})();
