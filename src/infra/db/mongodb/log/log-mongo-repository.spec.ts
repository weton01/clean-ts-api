import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log-mongo-repository'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('', () => {
  let errorColleciton: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorColleciton = await MongoHelper.getCollection('errors')
    await errorColleciton.deleteMany({})
  })

  test('should ', async () => {
    const sut = makeSut()
    await sut.logError('any_email')
    const count = await errorColleciton.countDocuments()
    expect(count).toBe(1)
  })
})
