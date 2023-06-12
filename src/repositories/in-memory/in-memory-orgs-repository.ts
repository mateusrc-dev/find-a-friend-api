import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async orgWithSameEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: 'org-1',
      address: data.address,
      whatsApp: data.whatsApp,
      CEP: data.CEP,
      city: data.city,
      email: data.email,
      name: data.name,
      password: data.password,
    }

    this.items.push(org)

    return org
  }
}
