import { makePetCreateUseCase } from '@/use-cases/factories/make-petCreate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const petCreateBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.enum(['SMALL', 'AVERAGE', 'BIG']),
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

  const createPetUseCase = makePetCreateUseCase()

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
    console.log(err)
    throw err
  }

  return reply.status(201).send()
}
