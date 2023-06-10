import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface UseCaseRequest {
  address: string
  whatsApp: string
  CEP: string
  email: string
  name: string
  password: string
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
  }: UseCaseRequest) {
    const password_hash = await hash(password, 6)
    const orgWithSameEmail = await this.orgsRepository.orgWithSameEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    await this.orgsRepository.create({
      address,
      whatsApp,
      CEP,
      email,
      name,
      password: password_hash,
    })
  }
}
