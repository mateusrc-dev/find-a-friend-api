import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { GetPetsUseCase } from '../get-pets'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-org-repository'

export function makeGetPetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrggRepository = new PrismaOrgsRepository()
  const getPetsUseCase = new GetPetsUseCase(
    prismaPetsRepository,
    prismaOrggRepository,
  )

  return getPetsUseCase
}
