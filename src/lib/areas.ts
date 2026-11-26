/** Area landing pages live at /apartments-in-<area slug>. */
export const AREA_PREFIX = 'apartments-in-'
export const areaPath = (slug: string) => `/${AREA_PREFIX}${slug}`
export const areaSlugFromPath = (slug: string) => (slug.startsWith(AREA_PREFIX) ? slug.slice(AREA_PREFIX.length) : null)
