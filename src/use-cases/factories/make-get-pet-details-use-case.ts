import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { GetPetDetailsUseCase } from '../get-pet-details'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-org-repository'

export function makeGetPetDetailsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const getPetDetailsUseCase = new GetPetDetailsUseCase(
    prismaPetsRepository,
    prismaOrgsRepository,
  )

  return getPetDetailsUseCase
}
