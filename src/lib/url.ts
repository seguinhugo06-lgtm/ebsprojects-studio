/**
 * Internal-link helpers.
 *
 * The site is normally served from the root of its own domain, but the
 * GitHub Pages test deployment sits under a sub-folder. Astro exposes that
 * prefix as `import.meta.env.BASE_URL` but does not apply it to `href`
 * attributes, so every internal link has to go through `url()`.
 */

/** BASE_URL is "/" at the root, "/sub-folder/" otherwise. Normalise to "" or "/sub-folder". */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Prefix an internal, root-relative path with the deployment base. */
export function url(path = '/'): string {
  // Anchors and absolute URLs (mailto:, tel:, https:) are left untouched.
  if (path.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(path)) return path;
  const clean = '/' + path.replace(/^\/+/, '');
  return BASE + clean === '' ? '/' : BASE + clean;
}

/** Remove the deployment base from a pathname so routes can be compared. */
export function stripBase(pathname: string): string {
  const p = BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  return p.replace(/\/+$/, '') || '/';
}
