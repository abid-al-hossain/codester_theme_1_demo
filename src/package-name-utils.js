export const DEFAULT_FALLBACK_PACKAGE = 'chronos-custom-site'

export function sanitizePackageName(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')
    || DEFAULT_FALLBACK_PACKAGE
}

export function sanitizeArchiveName(value) {
  return String(value || '')
    .trim()
    .replace(/[\\/:*?"<>|]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    || DEFAULT_FALLBACK_PACKAGE
}
