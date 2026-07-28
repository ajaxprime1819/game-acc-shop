import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "cuongdzzzzzzz09@gmail.com";
  const adminPass = process.env.ADMIN_PASSWORD || "TempPass!2026";
  const hashed = bcrypt.hashSync(adminPass, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashed, isAdmin: true },
    create: {
      email: adminEmail,
      password: hashed,
      isAdmin: true
    }
  });

  // sample provider seed (disabled)
  await prisma.provider.create({
    data: {
      name: "DemoProvider",
      slug: "demo-provider",
      enabled: false,
      authType: "hmac",
      credentials: {
        create: {
          key: "ENC_PLACEHOLDER",
          secret: "ENC_PLACEHOLDER",
          env: "sandbox"
        }
      }
    }
  });

  console.log("Seed complete. Admin:", adminEmail);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
