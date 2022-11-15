import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/criptography/encrypter'

export class BcryptAdapter implements Encrypter {
  constructor (private readonly salt: number) {}

  async encrypt (value: string): Promise<string> {
    const encrypt = await bcrypt.hash(value, this.salt)
    return await new Promise(resolve => resolve(encrypt))
  }
}
