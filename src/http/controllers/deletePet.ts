import { PetNotFoundError } from '@/use-cases/errors/pet-not-found-error'
import { makePetDeleteUseCase } from '@/use-cases/factories/make-petDelete-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deletePet(request: FastifyRequest, reply: FastifyReply) {
  const petDeleteBodySchema = z.object({
    petId: z.string(),
  })

  const { petId } = petDeleteBodySchema.parse(request.body)

  const deletePetUseCase = makePetDeleteUseCase()

  try {
    await deletePetUseCase.execute({
      id: petId,
    })
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
