import { describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialError } from './errors/invalid-credentials-error'
import { hash } from 'bcryptjs'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const sut = new AuthenticateUseCase(orgsRepository)

    await orgsRepository.create({
      address: 'Rua linda',
      whatsApp: '0869666666',
      CEP: '123123123',
      email: 'mateus@email.com',
      name: 'Mateus',
      password: await hash('123456', 6),
    })

    const { org } = await sut.execute({
      email: 'mateus@email.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const sut = new AuthenticateUseCase(orgsRepository)

    await orgsRepository.create({
      address: 'Rua linda',
      whatsApp: '0869666666',
      CEP: '123123123',
      email: 'mateus@email.com',
      name: 'Mateus',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        email: 'mateus_raimundo95@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
