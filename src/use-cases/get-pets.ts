import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { PetNotFoundError } from './errors/pet-not-found-error'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'

interface GetPetsUseCaseRequest {
  city: string
  uf: string
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
    uf,
    page,
    size,
    age,
    energyLevel,
    environment,
    independenceLevel,
  }: GetPetsUseCaseRequest): Promise<GetPetsUseCaseResponse> {
    const orgs = await this.orgsRepository.findOrgByCity(city, uf)

    if (!orgs) {
      throw new OrgNotFoundError()
    }

    const pets: Pet[] = []
    for (let i = 0; i < orgs.length; i++) {
      const org_id = orgs[i].id
      const findPets: Pet[] | null =
        await this.petsRepository.filterPetsByOrgIdAndCharacteristics(
          org_id,
          page,
          age,
          size,
          energyLevel,
          independenceLevel,
          environment,
        )

      if (findPets) {
        pets.push(...findPets)
      }
    }

    if (pets?.length === 0) {
      throw new PetNotFoundError()
    }

    return { pets }
  }
}
