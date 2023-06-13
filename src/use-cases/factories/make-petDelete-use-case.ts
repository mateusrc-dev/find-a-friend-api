import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { DeletePetUseCase } from '../petDelete'

export function makePetDeleteUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const createPetUseCase = new DeletePetUseCase(prismaPetsRepository)

  return createPetUseCase
}
