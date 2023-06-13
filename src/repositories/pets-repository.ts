import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findPetById(petId: string): Promise<Pet | null>
  filterPetsByOrgIdAndCharacteristics(
    org_id: string | undefined,
    page: number,
    age: string | undefined,
    size: string | undefined,
    energyLevel: string | undefined,
    independenceLevel: string | undefined,
    environment: string | undefined,
  ): Promise<Pet[] | null>
  petDelete(petId: string): Promise<Pet | null | undefined>
}
