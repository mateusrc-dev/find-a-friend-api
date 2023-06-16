import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async orgWithSameEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findOrgByCity(city: string, uf: string) {
    const orgs = this.items.filter(
      (item) => item.city === city && item.uf === uf,
    )

    if (!orgs) {
      return null
    }

    return orgs
  }

  async findOrgById(org_id: string) {
    const org = this.items.find((item) => item.id === org_id)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ? data.id : randomUUID(),
      address: data.address,
      whatsApp: data.whatsApp,
      CEP: data.CEP,
      city: data.city,
      uf: data.uf,
      email: data.email,
      name: data.name,
      password: data.password,
    }

    this.items.push(org)

    return org
  }
}
