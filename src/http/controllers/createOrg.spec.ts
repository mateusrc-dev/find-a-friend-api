import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create new org', async () => {
    const response = await request(app.server).post('/orgCreate').send({
      address: 'Rua linda',
      whatsApp: '0869666666',
      CEP: '64001250',
      email: 'mateus@email.com',
      name: 'Mateus',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
