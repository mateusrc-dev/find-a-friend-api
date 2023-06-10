import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-org-repository'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { CreateOrgUseCase } from '@/use-cases/orgCreate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
  const orgDetailsSchema = z.object({
    address: z.string(),
    whatsApp: z.string(),
    CEP: z.string(),
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6),
  })

  const { CEP, address, email, name, password, whatsApp } =
    orgDetailsSchema.parse(request.body)

  const prismaOrgsRepository = new PrismaOrgsRepository()
  const createOrgUseCase = new CreateOrgUseCase(prismaOrgsRepository)

  try {
    await createOrgUseCase.execute({
      CEP,
      address,
      email,
      name,
      password,
      whatsApp,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
