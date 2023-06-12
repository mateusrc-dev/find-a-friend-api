import { FastifyInstance } from 'fastify'
import { createOrg } from './controllers/createOrg'
import { createPet } from './controllers/createPet'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)

  app.post('/pets', createPet)
}
