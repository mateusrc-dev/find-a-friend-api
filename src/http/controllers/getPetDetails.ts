import { PetNotFoundError } from '@/use-cases/errors/pet-not-found-error'
import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPetDetails(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPetDetailsBodySchema = z.object({
    petId: z.string(),
  })

  const { petId } = getPetDetailsBodySchema.parse(request.query)

  const getPetDetailsUseCase = makeGetPetDetailsUseCase()

  try {
    const petDetails = await getPetDetailsUseCase.execute({
      petId,
    })

    return reply.status(201).send(petDetails)
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
