import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'
import { AuthenticationParams } from '../../../domain/usecases/authentication';
import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication,
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })

  xtest('Should call HttpPostClient with correct body', async () => {
    const url = faker.internet.url()
    const body: AuthenticationParams = {
      email: faker.internet.email(),
      password: faker.internet.password()
    } 
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth()
    expect(httpPostClientSpy.body).toBe(body)
  })
})