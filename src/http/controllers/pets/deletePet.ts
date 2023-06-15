import { PetNotFoundError } from '@/use-cases/errors/pet-not-found-error'
import { makePetDeleteUseCase } from '@/use-cases/factories/make-petDelete-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deletePet(request: FastifyRequest, reply: FastifyReply) {
  const petDeleteParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = petDeleteParamsSchema.parse(request.params)

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

  return reply.status(200).send()
}
