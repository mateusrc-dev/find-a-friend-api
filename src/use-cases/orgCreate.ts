import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { ORG } from '@prisma/client'

interface OrgCreateUseCaseRequest {
  address: string
  whatsApp: string
  CEP: string
  email: string
  name: string
  password: string
}

interface OrgCreateUseCaseResponse {
  org: ORG
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

    const org = await this.orgsRepository.create({
      address,
      whatsApp,
      CEP,
      email,
      name,
      password: password_hash,
    })

    return { org }
  }
}
