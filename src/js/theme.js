// Dark-mode toggle.
// - No saved choice: the CSS follows the OS setting (prefers-color-scheme).
// - Clicking the toggle saves "light" or "dark" to localStorage and sets <html data-theme>.
// - data-resolved-theme always holds the theme actually showing, so CSS can swap the icon.
const root = document.documentElement;
const media = window.matchMedia("(prefers-color-scheme: dark)");
const button = document.querySelector(".theme-toggle");

function resolvedTheme() {
  return root.dataset.theme || (media.matches ? "dark" : "light");
}

function render() {
  const theme = resolvedTheme();
  root.dataset.resolvedTheme = theme;
  button?.setAttribute("aria-pressed", String(theme === "dark"));
}

button?.addEventListener("click", () => {
  const next = resolvedTheme() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
  render();
});

// If the OS theme changes while the page is open (and there's no manual override), update the icon.
media.addEventListener("change", render);
render();
