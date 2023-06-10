import { hash } from 'bcryptjs'

interface UseCaseRequest {
  address: string
  whatsApp: string
  CEP: string
  email: string
  name: string
  password: string
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: any) {}

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
      throw new Error('Email already exist!')
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
