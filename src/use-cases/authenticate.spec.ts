import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialError } from './errors/invalid-credentials-error'
import { hash } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      address: 'Rua linda',
      whatsApp: '0869666666',
      CEP: '64001250',
      email: 'mateus@email.com',
      name: 'Mateus',
      password: await hash('123456', 6),
      city: 'Teresina',
      uf: 'Piauí',
    })

    const { org } = await sut.execute({
      email: 'mateus@email.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await orgsRepository.create({
      address: 'Rua linda',
      whatsApp: '0869666666',
      CEP: '123123123',
      email: 'mateus@email.com',
      name: 'Mateus',
      password: '123456',
      city: 'Teresina',
      uf: 'Piauí',
    })

    await expect(() =>
      sut.execute({
        email: 'mateus_raimundo95@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
