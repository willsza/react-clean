import { HttpPostClient, HttpPostParams } from '../../protocols/http/http-post-client'
import { AuthenticationParams } from '../../../domain/usecases/authentication'

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (authParams: AuthenticationParams): Promise<void> {
    const postParams: HttpPostParams = {
      url: this.url,
      body: authParams
    }
    await this.httpPostClient.post(postParams)
  }
}