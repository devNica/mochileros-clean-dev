import { PasswordEncryptorOutputPort } from '@core/ports/output/service/encryptors/password_encryptor_output.port'
import argon from 'argon2'

class PasswordEncryptorService implements PasswordEncryptorOutputPort {
  async derivePassword (password: string): Promise<string> {
    return await argon.hash(password)
  }

  async validatePassword (passwordHash: string, password: string): Promise<boolean> {
    return await argon.verify(passwordHash, password)
  }
}

export const passwordEncryptorService = new PasswordEncryptorService()
