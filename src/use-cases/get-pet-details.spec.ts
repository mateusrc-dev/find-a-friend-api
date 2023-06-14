import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from './get-pet-details'
import { PetNotFoundError } from './errors/pet-not-found-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetPetDetailsUseCase(petsRepository, orgsRepository)
  })

  it('should be able to get the details pet', async () => {
    await orgsRepository.create({
      id: 'org-1',
      address: 'Rua linda',
      whatsApp: '0869666666',
      CEP: '64001250',
      city: 'Teresina',
      email: 'mateus@email.com',
      name: 'Mateus',
      password: '123456',
    })

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

    const { pet, org } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.name).toEqual('Junin')
    expect(org?.id).toEqual('org-1')
  })

  it('should not be able to get the details pet with wrong id', async () => {
    expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
