export interface PasswordEncryptorOutputPort {
  derivePassword: (password: string) => Promise<string>
  validatePassword: (passwordHash: string, password: string) => Promise<boolean>
}
