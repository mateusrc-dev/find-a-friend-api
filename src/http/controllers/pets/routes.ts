import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { createPet } from './createPet'
import { getPets } from './getPets'
import { getPetDetails } from './getPetDetails'
import { deletePet } from './deletePet'

export async function petRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/pets', createPet)
  app.get('/getPets', getPets)
  app.get('/getPetDetails/:petId', getPetDetails)
  app.delete('/deletePet/:petId', deletePet)
}
