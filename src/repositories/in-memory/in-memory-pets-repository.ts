import { Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
// import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findPetById(petId: string) {
    const pet = this.items.find((item) => item.id === petId)

    if (!pet) {
      return null
    }

    return pet
  }

  async petDelete(petId: string) {
    const petDelete = this.items.find((item) => item.id === petId)
    const petsWithoutPetDelete = this.items.filter((item) => item.id !== petId)

    if (!petsWithoutPetDelete) {
      return null
    }

    this.items = petsWithoutPetDelete

    return petDelete
  }

  async filterPetsByOrgIdAndCharacteristics(
    org_id: string,
    page: number,
    age?: string,
    size?: string,
    energyLevel?: string,
    independenceLevel?: string,
    environment?: string,
  ) {
    const filteredPets = this.items
      .filter(
        (item) =>
          item.org_id &&
          item.org_id.includes(org_id) &&
          item.age.includes(age || '') &&
          item.size.includes(size || '') &&
          item.energyLevel.includes(energyLevel || '') &&
          item.independenceLevel.includes(independenceLevel || '') &&
          item.environment.includes(environment || ''),
      )
      .slice((page - 1) * 10, page * 10)

    return filteredPets
  }

  async create(data: Pet) {
    const pet: Pet = {
      id: data.id ? data.id : 'pet-1',
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
