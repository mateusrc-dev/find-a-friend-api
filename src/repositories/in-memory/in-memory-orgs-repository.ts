import { ORG, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
// import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: ORG[] = []

  async orgWithSameEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.ORGCreateInput) {
    const org = {
      id: 'org-1',
      address: data.address,
      whatsApp: data.whatsApp,
      CEP: data.CEP,
      email: data.email,
      name: data.name,
      password: data.password,
    }

    this.items.push(org)

    return org
  }
}
