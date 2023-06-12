import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { Org } from '@prisma/client'

interface OrgCreateUseCaseRequest {
  address: string
  whatsApp: string
  CEP: string
  email: string
  name: string
  password: string
}

interface OrgCreateUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    address,
    whatsApp,
    CEP,
    email,
    name,
    password,
  }: OrgCreateUseCaseRequest): Promise<OrgCreateUseCaseResponse> {
    const password_hash = await hash(password, 6)
    const orgWithSameEmail = await this.orgsRepository.orgWithSameEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const value = CEP.replace(/[^0-9]+/, '')
    const url = `https://viacep.com.br/ws/${value}/json/`
    let city

    await fetch(url)
      .then((response) => response.json())
      .then((json) => {
        city = json.localidade
      })

    const org = await this.orgsRepository.create({
      address,
      whatsApp,
      CEP,
      email,
      name,
      city,
      password: password_hash,
    })

    return { org }
  }
}
