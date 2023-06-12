import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { CreatePetUseCase } from '../petCreate'

export function makePetCreateUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const createPetUseCase = new CreatePetUseCase(prismaPetsRepository)

  return createPetUseCase
}
