import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { createOrg } from './createOrg'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgCreate', createOrg)
  app.post('/sessions', authenticate)
  app.get('/org', { onRequest: [verifyJWT] }, profile)
}
