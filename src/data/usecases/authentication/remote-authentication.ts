import { HttpPostClient, HttpPostParams } from '../../protocols/http/http-post-client';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (): Promise<void> {
    const params: HttpPostParams = {
      url: this.url
    }
    await this.httpPostClient.post(params)
  }
}