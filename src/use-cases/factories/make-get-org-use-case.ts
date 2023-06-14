import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-org-repository'
import { GetOrgUseCase } from '../get-org'

export function makeGetOrgUseCase() {
  const prismaOrgRepository = new PrismaOrgsRepository()
  const getOrgUseCase = new GetOrgUseCase(prismaOrgRepository)

  return getOrgUseCase
}
