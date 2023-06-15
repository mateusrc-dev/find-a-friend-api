import { OrgNotFoundError } from '@/use-cases/errors/org-not-found-error'
import { PetNotFoundError } from '@/use-cases/errors/pet-not-found-error'
import { makeGetPetsUseCase } from '@/use-cases/factories/make-get-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPets(request: FastifyRequest, reply: FastifyReply) {
  const getPetsQuerySchema = z.object({
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
    age: z.enum(['SMALL', 'AVERAGE', 'BIG', '']).default(''),
    size: z.enum(['SMALL', 'AVERAGE', 'BIG', '']).default(''),
    energyLevel: z.enum(['LOW', 'AVERAGE', 'HIGH', '']).default(''),
    independenceLevel: z.enum(['LOW', 'AVERAGE', 'HIGH', '']).default(''),
    environment: z.enum(['SMALL', 'AVERAGE', 'WIDE', '']).default(''),
  })

  const { city, page, age, energyLevel, environment, independenceLevel, size } =
    getPetsQuerySchema.parse(request.query)

  const getPetsUseCase = makeGetPetsUseCase()

  try {
    const pets = await getPetsUseCase.execute({
      city,
      page,
      age,
      size,
      energyLevel,
      independenceLevel,
      environment,
    })

    return reply.status(200).send(pets)
  } catch (err) {
    if (err instanceof OrgNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }
    if (err instanceof PetNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
