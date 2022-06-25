import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const users = []

    for (let index = 0; index < 1000; index ++){
        users.push({
            name: faker.name.findName(),
            email: faker.internet.email()
        })
    } 
    await prisma.user.createMany({
        data: users
    })
}

main().catch(e =>{
    console.log(e)
    process.exit(1)
}).finally(async () => await prisma.$disconnect())