import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaOrgsRepository {
  async create(data: Prisma.ORGCreateInput) {
    const org = await prisma.oRG.create({ data })

    return org
  }

  async orgWithSameEmail(email: string) {
    const Email = await prisma.oRG.findUnique({
      where: {
        email,
      },
    })
    return Email
  }
}
