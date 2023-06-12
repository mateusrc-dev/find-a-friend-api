import { Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
// import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Pet) {
    const pet: Pet = {
      id: 'pet-1',
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size ? data.size : 'AVERAGE',
      energyLevel: data.energyLevel ? data.energyLevel : 'AVERAGE',
      independenceLevel: data.independenceLevel
        ? data.independenceLevel
        : 'AVERAGE',
      environment: data.environment ? data.environment : 'AVERAGE',
      photos: data.photos,
      requirements: data.requirements,
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }
}
