import { FastifyInstance } from 'fastify'
import { createOrg } from './controllers/createOrg'
import { createPet } from './controllers/createPet'
import { authenticate } from './controllers/authenticate'
import { getPets } from './controllers/getPets'
import { deletePet } from './controllers/deletePet'
import { getPetDetails } from './controllers/getPetDetails'
import { profile } from './controllers/profile'
import { verifyJWT } from './middlewares/verify-jwt'

export async function AppRoutes(app: FastifyInstance) {
  app.post('/orgCreate', createOrg)
  app.post('/sessions', authenticate)
  app.get('/org', { onRequest: [verifyJWT] }, profile)

  app.post('/pets', createPet)
  app.get('/getPets', getPets)
  app.get('/getPetDetails', getPetDetails)
  app.delete('/deletePet', deletePet)
}
