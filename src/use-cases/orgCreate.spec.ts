import { describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './orgCreate'
import { compare } from 'bcryptjs'

describe('Create a ORG Use Case', () => {
  it('should hash org password upon registration', async () => {
    const createOrgUseCase = new CreateOrgUseCase({
      async orgWithSameEmail(email) {
        return null
      },
      async create(data) {
        return {
          id: 'org-1',
          address: data.address,
          whatsApp: data.whatsApp,
          CEP: data.CEP,
          email: data.email,
          name: data.name,
          password: data.password,
        }
      },
    })

    const { org } = await createOrgUseCase.execute({
      address: 'Rua linda',
      whatsApp: '0869666666',
      CEP: '123123123',
      email: 'mateus@email.com',
      name: 'Mateus',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
