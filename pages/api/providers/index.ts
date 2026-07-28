import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../src/lib/prisma";
import { encrypt } from "../../../src/lib/crypto";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const providers = await prisma.provider.findMany({ include: { credentials: true } });
    return res.json(providers.map(p => ({ ...p, credentials: p.credentials.map(c => ({ id: c.id, env: c.env })) })));
  }

  if (req.method === "POST") {
    const { name, slug, baseUrl, authType, credentials } = req.body;
    const provider = await prisma.provider.create({
      data: {
        name, slug, baseUrl, authType,
        credentials: {
          create: credentials.map((c: any) => ({
            key: encrypt(c.key),
            secret: c.secret ? encrypt(c.secret) : null,
            env: c.env || "sandbox"
          }))
        }
      }
    });
    return res.status(201).json(provider);
  }

  res.status(405).end();
}
