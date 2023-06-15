import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Delete Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able delete a pet', async () => {
    const { token, id } = await createAndAuthenticateOrg(app)

    const pet = await request(app.server)
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
        org_id: id,
      })

    const response = await request(app.server)
      .delete(`/deletePet/${pet.body.pet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
