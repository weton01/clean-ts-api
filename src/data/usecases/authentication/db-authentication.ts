import {
  Authentication,
  AuthenticationModel
} from '../../../domain/usecases/authentication'
import { HashComparer } from '../../protocols/criptography/hash-comparer'
import { Encrypter } from '../../protocols/criptography/encrypter'
import { UpdateAccessTokenRepository } from '../../protocols/db/update-access-token-repository'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(
      authentication.email
    )
    if (account) {
      const isValid = await this.hashComparer.compare(
        authentication.password,
        account.password
      )
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(
          account.id,
          accessToken
        )
        return accessToken
      }
    }

    return null
  }
}
