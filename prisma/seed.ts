import {
  user_relation,
  permission,
  category,
} from './migrations/user_relation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  for (const role of user_relation) {
    await prisma.role.createMany({
      data: user_relation,
    });
  }
}

async function main2() {
  for (const Permission of permission) {
    await prisma.permission.createMany({
      data: Permission,
    });
  }
}
async function main4() {
  for (const Category of category) {
    await prisma.category.createMany({
      data: Category,
    });
  }
}
// async function main3() {
//   for (const Roles_has_permissions of roles_has_permissions) {
//     await prisma.roles_has_permissions.createMany({
//       data: Roles_has_permissions,
//     });
//   }
// }
main()
  .catch((e) => {
    console.log(e);
    process.exit();
  })
  .finally(() => {
    prisma.$disconnect();
  });
main2()
  .catch((e) => {
    console.log(e);
    process.exit();
  })
  .finally(() => {
    prisma.$disconnect();
  });
// main3()
//   .catch((e) => {
//     console.log(e);
//     process.exit();
//   })
//   .finally(() => {
//     prisma.$disconnect();
//   });
main4()
  .catch((e) => {
    console.log(e);
    process.exit();
  })
  .finally(() => {
    prisma.$disconnect();
  });
