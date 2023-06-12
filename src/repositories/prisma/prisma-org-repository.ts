import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({ data })

    return org
  }

  async orgWithSameEmail(email: string) {
    const ORG = await prisma.org.findUnique({
      where: {
        email,
      },
    })
    return ORG
  }
}
