import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { InvalidCredentialsError } from '../../../domain/errors/invalid-credentials-error';
import { UnexpectedError } from '../../../domain/errors/unexpected-error';

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
    const response = await this.httpPostClient.post(postParams)
    
    switch (response.statusCode) {
      case HttpStatusCode.Ok:
        break;
      
      case HttpStatusCode.Unauthorized:
        throw new InvalidCredentialsError()
    
      default:
        throw new UnexpectedError()
    }
  }
}