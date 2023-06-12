import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { PetNotFoundError } from './errors/pet-not-found-error'

interface GetPetDetailsUseCaseRequest {
  petId: string
}

interface GetPetDetailsUseCaseResponse {
  pet: Pet
}

export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findPetById(petId)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return { pet }
  }
}
