import { FastifyInstance } from 'fastify'
import { createOrg } from './controllers/createOrg'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)
}
