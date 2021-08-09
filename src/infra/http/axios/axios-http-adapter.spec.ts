import { AxiosHttpAdapter } from './axios-http-adapter'
import { HttpPostParams } from '@/data/protocols/http/http-post-client'
import axios from 'axios'
import faker from 'faker'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

const makeSut = (): AxiosHttpAdapter => {
  return new AxiosHttpAdapter();
}
describe('AxiosHttpAdapter', () => {
  test('should AxiosHttpAdapter calls correct params', async() => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
})