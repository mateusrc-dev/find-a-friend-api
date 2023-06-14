import { Org, Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { PetNotFoundError } from './errors/pet-not-found-error'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface GetPetDetailsUseCaseRequest {
  petId: string
}

interface GetPetDetailsUseCaseResponse {
  pet: Pet
  org: Org | null
}

export class GetPetDetailsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    petId,
  }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findPetById(petId)
    const org = await this.orgsRepository.findOrgById(pet?.org_id)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return { pet, org }
  }
}
