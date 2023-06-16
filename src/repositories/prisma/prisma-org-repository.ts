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

  async findOrgByCity(city: string, uf: string) {
    const orgs = await prisma.org.findMany({
      where: {
        city,
        uf,
      },
    })

    if (!orgs) {
      return null
    }

    return orgs
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
