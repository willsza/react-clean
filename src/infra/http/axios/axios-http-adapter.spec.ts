import { AxiosHttpAdapter } from './axios-http-adapter'
import { HttpPostParams } from '@/data/protocols/http/http-post-client'
import axios from 'axios'
import faker from 'faker'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResponse = {
  data: faker.random.objectElement(),
  status: faker.random.alphaNumeric()
}
mockedAxios.post.mockResolvedValue(mockedAxiosResponse)

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

  test('should AxiosHttpAdapter return correct values', async() => {
    const sut = makeSut()
    const response = await sut.post(mockPostRequest())
    expect(response).toEqual({
      statusCode: mockedAxiosResponse.status,
      body: mockedAxiosResponse.data
    })
  })
})