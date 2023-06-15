import { Org, Prisma } from '@prisma/client'

export interface OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  orgWithSameEmail(email: string): Promise<Org | null>
  findOrgByCity(city: string): Promise<Org[] | null>
  findOrgById(org_id: string | undefined): Promise<Org | null>
}
