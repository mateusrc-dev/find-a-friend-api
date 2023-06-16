import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Get Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pets by city and characteristics', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const orgCreatedOne = await request(app.server).post('/orgCreate').send({
      address: 'Rua linda',
      whatsApp: '0869666666',
      CEP: '64001250',
      email: 'mateusraimundodecarvalho123@email.com',
      name: 'Mateus',
      password: '123456',
    })

    const orgCreatedTwo = await request(app.server).post('/orgCreate').send({
      address: 'Rua linda',
      whatsApp: '0869666666',
      CEP: '01015100',
      email: 'mateusraimundodecarvalho@email.com',
      name: 'Mateus',
      password: '123456',
    })

    const orgCreatedThree = await request(app.server).post('/orgCreate').send({
      address: 'Rua linda',
      whatsApp: '0869666666',
      CEP: '64001250',
      email: 'mateusraimundodecarvalho12345@email.com',
      name: 'Mateus',
      password: '123456',
    })

    await request(app.server)
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
        org_id: orgCreatedOne.body.org.id,
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Joãozin',
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
        org_id: orgCreatedTwo.body.org.id,
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Jorge',
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
        org_id: orgCreatedThree.body.org.id,
      })

    const response = await request(app.server)
      .get('/getPets')
      .query({
        city: 'Teresina',
        uf: 'PI',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
    expect(response.body.pets).toEqual([
      expect.objectContaining({ name: 'Junin' }),
      expect.objectContaining({ name: 'Jorge' }),
    ])
  })
})
