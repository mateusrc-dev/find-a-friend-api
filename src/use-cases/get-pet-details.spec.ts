import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from './get-pet-details'
import { PetNotFoundError } from './errors/pet-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get the details pet', async () => {
    const createdPet = await petsRepository.create({
      id: 'pet-1',
      name: 'Junin',
      description: 'Um cachorro fofo dos pelos loiros e pele branquinha',
      age: '5',
      size: 'BIG',
      energyLevel: 'HIGH',
      independenceLevel: 'AVERAGE',
      environment: 'WIDE',
      photos: ['https://github.com/mateusrc-dev.png'],
      requirements: [
        'ele gosta de comer muito',
        'tem q ser muito paciente',
        'ele gosta de ambientes muito espaçosos e é muito folgado',
      ],
      org_id: 'org-1',
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.name).toEqual('Junin')
  })

  it('should not be able to get the details pet with wrong id', async () => {
    expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
