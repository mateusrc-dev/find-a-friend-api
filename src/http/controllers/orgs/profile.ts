import { makeGetOrgUseCase } from '@/use-cases/factories/make-get-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getOrgUseCase = makeGetOrgUseCase()

  const { org } = await getOrgUseCase.execute({ id: request.user.sub })

  return reply.status(200).send({ org: { ...org, password_hash: undefined } })
}
