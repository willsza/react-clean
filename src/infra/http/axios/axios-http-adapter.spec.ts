import { AxiosHttpAdapter } from './axios-http-adapter'
import { HttpPostParams } from '@/data/protocols/http/http-post-client'
import { mockAxios } from '@/infra/test/mock-axios'
import axios from 'axios'
import faker from 'faker'

jest.mock('axios')

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

type SutTypes = {
  sut: AxiosHttpAdapter,
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpAdapter();
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpAdapter', () => {
  test('should AxiosHttpAdapter calls correct params', async () => {
    const request = mockPostRequest()
    const { sut, mockedAxios } = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('should AxiosHttpAdapter return correct values', async () => {
    const { sut, mockedAxios } = makeSut()
    const promise = sut.post(mockPostRequest())
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})