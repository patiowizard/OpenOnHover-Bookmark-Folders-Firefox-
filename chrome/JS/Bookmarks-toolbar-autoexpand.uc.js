// bookmarks-toolbar-auto-expand.uc.js
// Opens bookmark folders on the toolbar when hovering over them.
// Sibling folders close automatically when a new one is hovered.

(function () {
  if (window.location.href !== "chrome://browser/content/browser.xhtml") {
    return;
  }

  const bookmarksToolbar = document.getElementById("PlacesToolbarItems");
  if (!(bookmarksToolbar instanceof Element)) {
    return;
  }

  const isFolder = (node) => {
    if (node instanceof Element) {
      if (node.classList.contains("bookmark-item")) {
        if (node.getAttribute("type") === "menu" && node.getAttribute("container") === "true") {
          return true;
        }
      }
    }
  };

  const hoverListener = (event) => {
    if (isFolder(event.target)) {
      Array.from(event.target.parentNode.childNodes).filter(isFolder).forEach(current => {
        current.querySelector("menupopup")?.hidePopup();
      });
      event.target.querySelector("menupopup")?.openPopup(event.target, "after_start", 0, 0, false, false);
    }
  };

  const closeListener = (event) => {
    if (isFolder(event.target)) {
      event.target.querySelector("menupopup")?.hidePopup();
    }
  };

  const foldersObserver = new MutationObserver(mutationsList => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        if (mutation.addedNodes) {
          const addedFolders = Array.from(mutation.addedNodes).filter(isFolder);
          addedFolders.forEach(folder => {
            folder.addEventListener("mouseenter", hoverListener);
            folder.addEventListener("mouseleave", closeListener);
          });
        }
        if (mutation.removedNodes) {
          const removedFolders = Array.from(mutation.removedNodes).filter(isFolder);
          removedFolders.forEach(folder => {
            folder.removeEventListener("mouseenter", hoverListener);
            folder.removeEventListener("mouseleave", closeListener);
          });
        }
      }
    }
  });

  foldersObserver.observe(bookmarksToolbar, {
    childList: true
  });
})();
