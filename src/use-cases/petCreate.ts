import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface PetCreateUseCaseRequest {
  name: string
  description: string
  age: 'SMALL' | 'AVERAGE' | 'BIG'
  size: 'SMALL' | 'AVERAGE' | 'BIG'
  energyLevel: 'LOW' | 'AVERAGE' | 'HIGH'
  independenceLevel: 'LOW' | 'AVERAGE' | 'HIGH'
  environment: 'SMALL' | 'AVERAGE' | 'WIDE'
  photos: string[]
  requirements: string[]
  org_id: string
}

interface PetCreateUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    age,
    size,
    energyLevel,
    independenceLevel,
    environment,
    photos,
    requirements,
    org_id,
  }: PetCreateUseCaseRequest): Promise<PetCreateUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      size,
      energyLevel,
      independenceLevel,
      environment,
      photos,
      requirements,
      org_id,
    })

    return { pet }
  }
}
