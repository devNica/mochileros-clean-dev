export interface PasswordHasher {
  hashPassword: (password: string) => Promise<string>
  verifyPassword: (hashedPassword: string, password: string) => Promise<boolean>
}
