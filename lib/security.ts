/**
 * Detects potential SQL injection in a string
 */
export function detectSqlInjection(input: string): boolean {
  if (!input) return false

  // Common SQL injection patterns
  const sqlPatterns = [
    // SQL keywords with boundaries or common structures
    /(\s|^)(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|EXEC|UNION|CREATE|WHERE)(\s|$)/i,
    // Classic Boolean tautologies e.g. ' OR 1=1, ' OR 'a'='a', OR '1'='1'
    /(['"]|\b)(OR|AND)\b\s+(['"]?\w+['"]?\s*=\s*['"]?\w+['"]?)/i,
    /\b(OR|AND)\s+['"]?1['"]?\s*=\s*['"]?1['"]?/i,
    /\b(OR|AND)\s+['"]?[a-z0-9]['"]?\s*=\s*['"]?[a-z0-9]['"]?/i,
    // UNION-based injections
    /UNION(\s+ALL)?\s+SELECT/i,
    // Statement terminators and inline comments
    /['"];/i,
    /--/,
    /\/\*/,
    /\*\//,
    // Database specific procedures and functions
    /xp_[a-z0-9_]+/i,
    /SLEEP\s*\(\s*\d+\s*\)/i,
    /BENCHMARK\s*\(\s*\d+\s*,/i,
    /pg_sleep\s*\(\s*\d+\s*\)/i,
    /WAITFOR\s+DELAY/i,
    // Stacked query executions
    /;\s*(DROP|ALTER|DELETE|UPDATE|INSERT|CREATE)\b/i,
  ]

  return sqlPatterns.some((pattern) => pattern.test(input))
}

/**
 * Checks if a file type is allowed for upload
 */
export function isFileTypeAllowed(filename: string): boolean {
  if (!filename) return false

  // Get file extension
  const extension = filename.split(".").pop()?.toLowerCase() || ""

  // List of allowed file extensions
  const allowedExtensions = ["jpg", "jpeg", "png", "gif", "pdf", "doc", "docx", "xls", "xlsx", "txt", "csv"]

  // List of explicitly blocked extensions (high-risk file types)
  const blockedExtensions = [
    "exe",
    "bat",
    "cmd",
    "sh",
    "js",
    "php",
    "html",
    "htm",
    "asp",
    "aspx",
    "jsp",
    "dll",
    "msi",
    "vbs",
    "ps1",
    "py",
    "rb",
    "pl",
  ]

  // Block explicitly dangerous extensions
  if (blockedExtensions.includes(extension)) {
    return false
  }

  // Only allow explicitly permitted extensions
  return allowedExtensions.includes(extension)
}
