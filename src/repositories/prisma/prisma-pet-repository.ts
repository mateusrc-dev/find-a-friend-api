import { prisma } from '@/lib/prisma'
import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findPetById(petId: string) {
    const pet: Pet | null = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    })

    return pet
  }

  async filterPetsByOrgIdAndCharacteristics(
    org_id: string,
    page: number,
    age: string,
    size: string,
    energyLevel: string,
    independenceLevel: string,
    environment: string,
  ) {
    const pets: Pet[] | null = await prisma.pet.findMany({
      where: {
        org: {
          id: org_id,
        },
        age: {
          contains: age,
        },
        size: {
          contains: size,
        },
        energyLevel: {
          contains: energyLevel,
        },
        independenceLevel: {
          contains: independenceLevel,
        },
        environment: {
          contains: environment,
        },
      },

      take: 10,
      skip: (page - 1) * 10,
    })

    return pets
  }
}
