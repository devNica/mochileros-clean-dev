import argon from 'argon2'
import { PasswordHasher } from '@application/ports/security/password'

export class ArgonPasswordAdapter implements PasswordHasher {
  async hashPassword (password: string): Promise<string> {
    return await argon.hash(password)
  }

  async verifyPassword (hashedPassword: string, password: string): Promise<boolean> {
    return await argon.verify(hashedPassword, password)
  }
}
