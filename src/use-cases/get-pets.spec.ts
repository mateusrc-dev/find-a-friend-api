import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetsUseCase } from './get-pets'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let sut: GetPetsUseCase
let orgsRepository: InMemoryOrgsRepository

describe('Get Pets Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetsUseCase(petsRepository, orgsRepository)
  })

  it('should be able to get pets by city and characteristics', async () => {
    await orgsRepository.create({
      id: 'org-1',
      address: 'Rua linda',
      whatsApp: '0869666666',
      CEP: '64001250',
      email: 'mateus@email.com',
      name: 'Mateus',
      password: '123456',
      city: 'Teresina',
    })

    await orgsRepository.create({
      id: 'org-2',
      address: 'Rua linda',
      whatsApp: '0869666666',
      CEP: '64001250',
      email: 'mateus@email.com',
      name: 'Mateus',
      password: '123456',
      city: 'Fortaleza',
    })

    await petsRepository.create({
      id: 'pet-1',
      name: 'Junin',
      description: 'Um cachorro fofo dos pelos loiros e pele branquinha',
      age: 'SMALL',
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

    await petsRepository.create({
      id: 'pet-2',
      name: 'João',
      description: 'Um cachorro impaciente',
      age: 'SMALL',
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
      org_id: 'org-2',
    })

    const { pets } = await sut.execute({
      city: 'Teresina',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Junin' })])
  })
})
