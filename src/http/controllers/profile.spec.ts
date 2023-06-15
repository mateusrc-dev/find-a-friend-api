import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get org details', async () => {
    await request(app.server).post('/orgCreate').send({
      address: 'Rua linda',
      whatsApp: '0869666666',
      CEP: '64001250',
      email: 'mateus@email.com',
      name: 'Mateus',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'mateus@email.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/org')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.org).toEqual(
      expect.objectContaining({ email: 'mateus@email.com' }),
    )
  })
})
