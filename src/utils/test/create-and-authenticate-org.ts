import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
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
  return { token }
}
