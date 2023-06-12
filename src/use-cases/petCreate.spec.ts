import { describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './petCreate'

describe('Create a Pet Use Case', () => {
  it('should be able create a new pet', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const createOrgUseCase = new CreatePetUseCase(petsRepository)

    const { pet } = await createOrgUseCase.execute({
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

    expect(pet.id).toEqual(expect.any(String))
  })
})
