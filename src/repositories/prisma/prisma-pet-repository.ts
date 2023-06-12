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
}
