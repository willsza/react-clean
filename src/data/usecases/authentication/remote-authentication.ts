import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { AccountModel } from '@/domain/models/account-model';
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { UnexpectedError } from '@/domain/errors/unexpected-error';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth (authParams: AuthenticationParams): Promise<AccountModel> {
    const postParams: HttpPostParams<AuthenticationParams> = {
      url: this.url,
      body: authParams
    }
    const response = await this.httpPostClient.post(postParams)
    
    switch (response.statusCode) {
      case HttpStatusCode.Ok:
        return response.body
      
      case HttpStatusCode.Unauthorized:
        throw new InvalidCredentialsError()
    
      default:
        throw new UnexpectedError()
    }
  }
}