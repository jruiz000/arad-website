export const routeToId = {
  "how-it-works": "how-it-works",
  "asset-coverage": "asset-coverage",
  "pricing": "pricing",
  "documentation": "documentation",
  "about": "about",
  "faq": "faq",
  "contact": "contact",
};

export function pathFromSectionId(sectionId) {
  return `/${sectionId}`;
}

export function navigateToSection(sectionId) {
  // Check if we're currently in dashboard
  if (isDashboardPath()) {
    // If in dashboard, navigate to main site first, then scroll to section
    const path = pathFromSectionId(sectionId);
    window.location.href = window.location.origin + path;
    return;
  }
  
  const path = pathFromSectionId(sectionId);
  if (window.location.pathname !== path) {
    window.history.pushState({}, "", path);
  }
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToSectionFromCurrentPath() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  const sectionId = routeToId[path];
  if (sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
}

export function isDashboardPath() {
  return window.location.pathname === "/dashboard";
}

export function navigateToHome() {
  if (isDashboardPath()) {
    // If in dashboard, navigate to main site
    window.location.href = window.location.origin + "/";
    return;
  }
  
  // If already on main site, scroll to top
  window.history.pushState({}, "", "/");
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
