import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      name: 'Gabriel Garcez',
      about: 'Fullstack developer na stack ReactJS, NodeJS com Typescript. Atualmente cursando o terceiro período de Ciência da Computação.',
      email: 'ggarcez613@gmail.com',
      github_username: 'Garcez17',
      phone_number: '(71) 9 8191-3913',
      title: 'Fullstack developer',
      avatar_url: '',
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })