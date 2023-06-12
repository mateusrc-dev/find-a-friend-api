import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './orgCreate'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create a ORG Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able create a new org', async () => {
    const { org } = await sut.execute({
      address: 'Rua linda',
      whatsApp: '0869666666',
      CEP: '64001250',
      email: 'mateus@email.com',
      name: 'Mateus',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('it should be possible to create a password hash when creating a new org', async () => {
    const { org } = await sut.execute({
      address: 'Rua linda',
      whatsApp: '0869666666',
      CEP: '64001250',
      email: 'mateus@email.com',
      name: 'Mateus',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to create a new org with same email twice', async () => {
    const email = 'mateusraimundo@email.com'

    await sut.execute({
      address: 'Rua linda',
      whatsApp: '0869666666',
      CEP: '64001250',
      email,
      name: 'Mateus',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        address: 'Rua linda',
        whatsApp: '0869666666',
        CEP: '64001250',
        email,
        name: 'Mateus',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
