import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({ data })

    return org
  }

  async findOrgById(org_id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id: org_id,
      },
    })

    if (!org) {
      return null
    }

    return org
  }

  async findOrgByCity(city: string) {
    const org = await prisma.org.findFirst({
      where: {
        city,
      },
    })

    if (!org) {
      return null
    }

    return org
  }

  async orgWithSameEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })
    return org
  }
}
