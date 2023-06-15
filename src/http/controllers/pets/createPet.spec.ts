import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create new pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const orgCreated = await request(app.server).post('/orgCreate').send({
      address: 'Rua linda',
      whatsApp: '0869666666',
      CEP: '64001250',
      email: 'mateusraimundodecarvalho123@email.com',
      name: 'Mateus',
      password: '123456',
    })

    console.log(orgCreated.body.org.org.id)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Junin',
        description: 'Um cachorro fofo dos pelos loiros e pele branquinha',
        age: 'SMALL',
        size: 'BIG',
        energyLevel: 'HIGH',
        independenceLevel: 'AVERAGE',
        environment: 'WIDE',
        photos: ['https://github.com/mateusrc-dev.png'],
        requirements: [
          'ele gosta de comer muito',
          'tem q ser muito paciente',
          'ele gosta de ambientes muito espaçosos e é muito folgado',
        ],
        org_id: orgCreated.body.org.org.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
