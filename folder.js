document.addEventListener('DOMContentLoaded', function () {
  var rem        = parseFloat(getComputedStyle(document.documentElement).fontSize);
  var TAB_H      = 3 * rem;     // px — gap between stacked folders
  var EXP_H      = 13  * rem;   // px — expanded folder height
  var DRAG_MIN   = 28;           // px upward drag to commit expand
  var TAP_MAX    = 8;            // px — less than this = tap (navigate)

  var selectors = [
    '.folder_1','.folder_2','.folder_3',
    '.folder_4','.folder_5','.folder_6',
    '.folder_7','.folder_8','.folder_9'
  ];
  var folders = selectors.map(function (s) {
    return document.querySelector(s);
  }).filter(Boolean);

  // ── Set initial bottom positions ─────────────────────────────
  // folder_9 (i=8) → bottom = 0 (sits on screen bottom)
  // folder_1 (i=0) → bottom = 8 × TAB_H (highest)
  function setInitialPositions() {
    rem   = parseFloat(getComputedStyle(document.documentElement).fontSize);
    TAB_H = 3 * rem;
    EXP_H = 13  * rem;
    folders.forEach(function (folder, i) {
      var b = (folders.length - 1 - i) * TAB_H;
      folder.style.bottom = b + 'px';
    });
  }

  setInitialPositions();
  window.addEventListener('resize', setInitialPositions);

  // ── Drag & tap per folder ────────────────────────────────────
  folders.forEach(function (folder) {
    var startY     = 0;
    var startH     = 0;
    var moved      = false;

    folder.addEventListener('mousedown',  onStart);
    folder.addEventListener('touchstart', onStart, { passive: true });

    function onStart(e) {
      startY = getY(e);
      startH = folder.classList.contains('folder-expanded') ? EXP_H
             : folder.getBoundingClientRect().height;
      moved  = false;

      // disable height transition for live drag feel; clip-path still transitions
      folder.style.transition = 'clip-path 0.35s cubic-bezier(0.4,0,0.2,1)';

      document.addEventListener('mousemove',  onMove);
      document.addEventListener('touchmove',  onMove, { passive: false });
      document.addEventListener('mouseup',    onEnd);
      document.addEventListener('touchend',   onEnd);
    }

    function onMove(e) {
      var dy = getY(e) - startY;  // negative = dragging up
      if (Math.abs(dy) > TAP_MAX) {
        moved = true;
        // show preview + straight sides as soon as drag starts
        folder.classList.add('folder-dragging');
      }
      if (!moved) return;
      if (e.cancelable) e.preventDefault();

      var newH = Math.max(startH, Math.min(EXP_H, startH - dy));
      folder.style.height = newH + 'px';
    }

    function onEnd(e) {
      folder.classList.remove('folder-dragging');
      // re-enable full transition for snap
      folder.style.transition = '';
      folder.style.height     = '';

      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('touchmove',  onMove);
      document.removeEventListener('mouseup',    onEnd);
      document.removeEventListener('touchend',   onEnd);

      var dy = getY(e) - startY;

      if (!moved) {
        // Tap → navigate
        var href = folder.getAttribute('data-href');
        if (href) window.location.href = href;
        return;
      }

      if (dy < -DRAG_MIN) {
        // Collapse all others, expand this one (keep natural z-index)
        folders.forEach(function (f) { f.classList.remove('folder-expanded'); });
        folder.classList.add('folder-expanded');
      } else {
        folder.classList.remove('folder-expanded');
      }
    }
  });

  function getY(e) {
    if (e.touches        && e.touches.length)        return e.touches[0].clientY;
    if (e.changedTouches && e.changedTouches.length) return e.changedTouches[0].clientY;
    return e.clientY;
  }
});
