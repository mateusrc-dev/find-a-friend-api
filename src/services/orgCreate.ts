import { PrismaOrgsRepository } from '@/repositories/prisma-org-repository'
import { hash } from 'bcryptjs'

interface UseCaseRequest {
  address: string
  whatsApp: string
  CEP: string
  email: string
  name: string
  password: string
}

export async function orgCreateUseCase({
  address,
  whatsApp,
  CEP,
  email,
  name,
  password,
}: UseCaseRequest) {
  const password_hash = await hash(password, 6)
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const orgWithSameEmail = await prismaOrgsRepository.orgWithSameEmail(email)

  if (orgWithSameEmail) {
    throw new Error('Email already exist!')
  }

  await prismaOrgsRepository.create({
    address,
    whatsApp,
    CEP,
    email,
    name,
    password: password_hash,
  })
}
