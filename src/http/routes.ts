import { FastifyInstance } from 'fastify'
import { createOrg } from './controllers/createOrg'
import { createPet } from './controllers/createPet'
import { authenticate } from './controllers/authenticate'
import { getPets } from './controllers/getPets'
import { deletePet } from './controllers/deletePet'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)
  app.post('/sessions', authenticate)
  app.post('/pets', createPet)
  app.get('/getPets', getPets)
  app.delete('/deletePet', deletePet)
}
