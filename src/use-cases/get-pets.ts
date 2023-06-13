import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { PetNotFoundError } from './errors/pet-not-found-error'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'

interface GetPetsUseCaseRequest {
  city: string
  page: number
  age?: string
  size?: string
  energyLevel?: string
  independenceLevel?: string
  environment?: string
}

interface GetPetsUseCaseResponse {
  pets: Pet[]
}

export class GetPetsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    city,
    page,
    size,
    age,
    energyLevel,
    environment,
    independenceLevel,
  }: GetPetsUseCaseRequest): Promise<GetPetsUseCaseResponse> {
    const org = await this.orgsRepository.findOrgByCity(city)

    if (!org) {
      throw new OrgNotFoundError()
    }

    const org_id = org?.id

    const pets = await this.petsRepository.filterPetsByOrgIdAndCharacteristics(
      org_id,
      page,
      age,
      size,
      energyLevel,
      independenceLevel,
      environment,
    )

    if (!pets) {
      throw new PetNotFoundError()
    }

    return { pets }
  }
}
