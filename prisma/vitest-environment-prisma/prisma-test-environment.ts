import { Environment } from 'vitest'

export default <Environment>{
  name: 'Prisma',
  async setup() {
    console.log('Setup')
    return {
      async teardown() {
        console.log('Teardown')
      },
    }
  },
}
