import { OrgsRepository } from '@/repositories/orgs-repository'
import { compare } from 'bcryptjs'
import { Org } from '@prisma/client'
import { InvalidCredentialError } from './errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  org: Org
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.orgWithSameEmail(email)

    if (!org) {
      throw new InvalidCredentialError()
    }

    const doesPasswordMatches = await compare(password, org.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialError()
    }

    return { org }
  }
}
