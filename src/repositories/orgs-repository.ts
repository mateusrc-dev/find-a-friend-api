import { ORG, Prisma } from '@prisma/client'

export interface OrgsRepository {
  create(data: Prisma.ORGCreateInput): Promise<ORG>
  orgWithSameEmail(email: string): Promise<ORG | null>
}
