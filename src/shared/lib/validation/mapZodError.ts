import type { ZodError } from 'zod'

export const mapZodError = (error: ZodError) => {
  return error.issues.reduce<Record<string, string>>((acc, issue) => {
    const path = issue.path.join('.')
    if (path) {
      acc[path] = issue.message
    }
    return acc
  }, {})
}
