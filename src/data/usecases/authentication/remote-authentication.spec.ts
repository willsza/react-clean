import { HttpPostClient } from '../../protocols/http/http-post-client'
import { RemoteAuthentication } from './remote-authentication'

class HttpPostClientSpy implements HttpPostClient {
  url?: string;

  async post (url: string): Promise<void> {
    this.url = url
    return Promise.resolve()
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = 'any_url'
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    
    await sut.auth()
    
    expect(httpPostClientSpy.url).toBe(url)
  });
});