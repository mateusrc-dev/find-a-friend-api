import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-org-repository'
import { CreateOrgUseCase } from '../orgCreate'

export function makeOrgCreateUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const createOrgUseCase = new CreateOrgUseCase(prismaOrgsRepository)

  return createOrgUseCase
}
