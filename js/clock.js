/**
 * Live Bangladesh Clock & Day/Night Indicator
 * Real-time calculation for Dhaka timezone (Asia/Dhaka, UTC+6).
 */

(function () {
  function updateBangladeshClock() {
    const timeEls = document.querySelectorAll('.bd-clock-time');
    const periodEls = document.querySelectorAll('.bd-clock-period');
    const statusEls = document.querySelectorAll('.bd-clock-status');
    const iconWraps = document.querySelectorAll('.bd-clock-icon');

    if (!timeEls.length) return;

    try {
      // Format time explicitly in Dhaka timezone
      const now = new Date();
      const options = {
        timeZone: 'Asia/Dhaka',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };

      const formatter = new Intl.DateTimeFormat('en-US', options);
      const parts = formatter.formatToParts(now);

      let hour = '12';
      let minute = '00';
      let second = '00';
      let dayPeriod = 'PM';

      for (const part of parts) {
        if (part.type === 'hour') hour = part.value;
        if (part.type === 'minute') minute = part.value;
        if (part.type === 'second') second = part.value;
        if (part.type === 'dayPeriod') dayPeriod = part.value.toUpperCase();
      }

      // Check hour in 24-hr format to determine day/night accurately
      const hr24Formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        hour12: false,
        hour: 'numeric'
      });
      const hour24 = parseInt(hr24Formatter.format(now), 10);
      const isDaytime = hour24 >= 6 && hour24 < 18; // 6 AM to 6 PM

      timeEls.forEach((el) => {
        el.textContent = `${hour}:${minute}:${second}`;
      });

      periodEls.forEach((el) => {
        el.textContent = dayPeriod;
      });

      statusEls.forEach((el) => {
        el.textContent = isDaytime ? 'Daytime in Dhaka' : 'Night in Dhaka';
      });

      iconWraps.forEach((el) => {
        if (isDaytime) {
          // Sun SVG
          el.innerHTML = `
            <svg class="clock-icon-anim" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          `;
          el.setAttribute('title', 'Daytime in Dhaka (Sun is up)');
        } else {
          // Crescent Moon SVG
          el.innerHTML = `
            <svg class="clock-icon-anim" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          `;
          el.setAttribute('title', 'Nighttime in Dhaka (Stars & Moon)');
        }
      });
    } catch (e) {
      console.warn('Clock timezone update error:', e);
    }
  }

  // Update immediately and then every second
  updateBangladeshClock();
  setInterval(updateBangladeshClock, 1000);
})();
