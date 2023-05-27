const headerFooterExceptions = [
  'login',
  'register',
  'forgot-password',
  'confirm-code',
  'change-password',
  'admin',
  'profile'
]

export const useExcept = (path) =>
  !headerFooterExceptions.includes(path.split('/')[1])
