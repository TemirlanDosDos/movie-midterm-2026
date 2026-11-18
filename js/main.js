const themeStorageKey = "cinescope-theme";
const userStorageKey = "cinescope-user";

function readTheme() {
  try {
    return localStorage.getItem(themeStorageKey);
  } catch (error) {
    return null;
  }
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme === "light" ? "light" : "dark";
}

const savedTheme = readTheme();
const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
applyTheme(savedTheme || preferredTheme);

document.addEventListener("DOMContentLoaded", function () {
  const linkGroup = document.querySelector(
    ".nav-links, .account-nav-links, .nav-menu, .site-navigation > div"
  );

  if (linkGroup) {
    const themeButton = document.createElement("button");
    themeButton.className = "theme-toggle";
    themeButton.type = "button";

    function updateThemeButton() {
      const isLight = document.documentElement.dataset.theme === "light";
      themeButton.textContent = isLight ? "Dark" : "Light";
      themeButton.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
      themeButton.setAttribute("aria-pressed", String(isLight));
    }

    updateThemeButton();

    if (linkGroup.tagName === "UL") {
      const listItem = document.createElement("li");
      listItem.appendChild(themeButton);
      linkGroup.appendChild(listItem);
    } else {
      linkGroup.appendChild(themeButton);
    }

    themeButton.addEventListener("click", function () {
      const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
      applyTheme(nextTheme);
      try {
        localStorage.setItem(themeStorageKey, nextTheme);
      } catch (error) {
        // The selected theme still works for the current page when storage is unavailable.
      }
      updateThemeButton();
    });
  }

  function updateAccountLinks() {
    const accountLinks = document.querySelectorAll("[data-account-link]");
    let user = null;

    try {
      user = JSON.parse(localStorage.getItem(userStorageKey));
    } catch (error) {
      user = null;
    }

    if (user && typeof user.name === "string" && user.name.trim()) {
      const firstName = user.name.trim().split(/\s+/)[0];
      accountLinks.forEach(function (link) {
        link.textContent = firstName;
        link.setAttribute("aria-label", "Open profile for " + firstName);
      });
    } else {
      accountLinks.forEach(function (link) {
        link.textContent = "Sign in";
        link.removeAttribute("aria-label");
      });
    }
  }
  updateAccountLinks();
  window.addEventListener("account-change", updateAccountLinks);
  window.addEventListener("storage", updateAccountLinks);
});

