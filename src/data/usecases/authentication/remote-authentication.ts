import { HttpPostClient, HttpPostParams, HttpStatusCode } from '@/data/protocols/http'
import { AccountModel } from '@/domain/models';
import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';

export class RemoteAuthentication implements Authentication {
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