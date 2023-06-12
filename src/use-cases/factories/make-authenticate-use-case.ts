import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-org-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const authenticateUseCase = new AuthenticateUseCase(prismaOrgsRepository)

  return authenticateUseCase
}
