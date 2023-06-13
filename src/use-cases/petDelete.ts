import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { PetNotFoundError } from './errors/pet-not-found-error'

interface PetDeleteUseCaseRequest {
  id: string
}

interface PetDeleteUseCaseResponse {
  pet: Pet
}

export class DeletePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: PetDeleteUseCaseRequest): Promise<PetDeleteUseCaseResponse> {
    const pet = await this.petsRepository.petDelete(id)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return { pet }
  }
}
