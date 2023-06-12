import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { CreatePetUseCase } from '@/use-cases/petCreate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const petCreateBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.string(),
    size: z.enum(['SMALL', 'AVERAGE', 'BIG']),
    energyLevel: z.enum(['LOW', 'AVERAGE', 'HIGH']),
    independenceLevel: z.enum(['LOW', 'AVERAGE', 'HIGH']),
    environment: z.enum(['SMALL', 'AVERAGE', 'WIDE']),
    photos: z.array(z.string()),
    requirements: z.array(z.string()),
    org_id: z.string(),
  })

  const {
    age,
    description,
    energyLevel,
    environment,
    independenceLevel,
    name,
    org_id,
    photos,
    requirements,
    size,
  } = petCreateBodySchema.parse(request.body)

  const prismaPetsRepository = new PrismaPetsRepository()
  const createPetUseCase = new CreatePetUseCase(prismaPetsRepository)

  try {
    await createPetUseCase.execute({
      age,
      description,
      energyLevel,
      environment,
      independenceLevel,
      name,
      org_id,
      photos,
      requirements,
      size,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
