document.addEventListener('DOMContentLoaded', function () {
  var rem        = parseFloat(getComputedStyle(document.documentElement).fontSize);
  var TAB_H      = 3 * rem;     // px — gap between stacked folders
  var EXP_H      = 13  * rem;   // px — expanded folder height
  var DRAG_MIN   = 28;           // px upward drag to commit expand
  var TAP_MAX    = 8;            // px — less than this = tap (navigate)

  /* ── Static folders ─────────────────────────────────────────── */
  var staticSelectors = [
    '.folder_1','.folder_2','.folder_3',
    '.folder_4','.folder_5','.folder_6',
    '.folder_7','.folder_8','.folder_9'
  ];
  var staticFolders = staticSelectors.map(function (s) {
    return document.querySelector(s);
  }).filter(Boolean);

  /* ── User folders from localStorage ─────────────────────────── */
  var allEntries = [];
  try {
    allEntries = JSON.parse(localStorage.getItem('tarot_entries') || '[]');
  } catch (e) {}
  // Only show entries that belong to Selina's drawer (no drawerId)
  var entries = allEntries.filter(function (e) { return !e.drawerId; });

  var userFolders = entries.map(function (entry, idx) {
    var el = document.createElement('div');

    // Absolute index in the combined stack (static count + user index)
    var absIdx = staticFolders.length + idx;
    // Odd absolute index → right tab (matches static pattern: folder_1=idx0→tab-right)
    var tabClass = (absIdx % 2 === 0) ? 'tab-right' : 'tab-left';

    el.className = 'folder_user ' + tabClass;
    el.setAttribute('data-href', 'entry.html?id=' + entry.id);
    el.style.setProperty('--user-color', entry.color);

    var isReversed = entry.orientation === 'reversed';
    var displayName = entry.cardName + (isReversed ? ' (Reversed)' : '');

    el.innerHTML =
      '<div class="folder-body">' +
        '<span class="folder-label">' + entry.date + '</span>' +
        '<div class="folder-preview">' +
          '<p>' + displayName + '</p>' +
          '<img src="' + entry.cardImage + '" alt="' + displayName + '">' +
        '</div>' +
      '</div>';

    document.body.appendChild(el);
    return el;
  });

  /* ── Combined stack: static first (top), user last (bottom) ──── */
  var allFolders = staticFolders.concat(userFolders);

  /* ── Position all folders and the + button ───────────────────── */
  function setInitialPositions() {
    rem   = parseFloat(getComputedStyle(document.documentElement).fontSize);
    TAB_H = 3 * rem;
    EXP_H = 13  * rem;

    // i=0 → topmost (highest bottom value), i=last → bottommost (bottom=0)
    allFolders.forEach(function (folder, i) {
      var b = (allFolders.length - 1 - i) * TAB_H;
      folder.style.bottom  = b + 'px';
      folder.style.zIndex  = (i + 1).toString();
    });

  }

  setInitialPositions();
  window.addEventListener('resize', setInitialPositions);

  /* ── Drag & tap logic (same for all folders) ─────────────────── */
  allFolders.forEach(function (folder) {
    var startY = 0;
    var startH = 0;
    var moved  = false;

    folder.addEventListener('mousedown',  onStart);
    folder.addEventListener('touchstart', onStart, { passive: true });

    function onStart(e) {
      startY = getY(e);
      startH = folder.classList.contains('folder-expanded') ? EXP_H
             : folder.getBoundingClientRect().height;
      moved  = false;

      folder.style.transition = 'clip-path 0.35s cubic-bezier(0.4,0,0.2,1)';

      document.addEventListener('mousemove',  onMove);
      document.addEventListener('touchmove',  onMove, { passive: false });
      document.addEventListener('mouseup',    onEnd);
      document.addEventListener('touchend',   onEnd);
    }

    function onMove(e) {
      var dy = getY(e) - startY;
      if (Math.abs(dy) > TAP_MAX) {
        moved = true;
        folder.classList.add('folder-dragging');
      }
      if (!moved) return;
      if (e.cancelable) e.preventDefault();

      var newH = Math.max(startH, Math.min(EXP_H, startH - dy));
      folder.style.height = newH + 'px';
    }

    function onEnd(e) {
      folder.classList.remove('folder-dragging');
      folder.style.transition = '';
      folder.style.height     = '';

      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('touchmove',  onMove);
      document.removeEventListener('mouseup',    onEnd);
      document.removeEventListener('touchend',   onEnd);

      var dy = getY(e) - startY;

      if (!moved) {
        var href = folder.getAttribute('data-href');
        if (href) window.location.href = href;
        return;
      }

      if (dy < -DRAG_MIN) {
        allFolders.forEach(function (f) { f.classList.remove('folder-expanded'); });
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
