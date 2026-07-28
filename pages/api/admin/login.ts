import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../src/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid" });
  const ok = bcrypt.compareSync(password, user.password);
  if (!ok || !user.isAdmin) return res.status(401).json({ error: "Invalid" });

  const token = jwt.sign({ userId: user.id, isAdmin: true }, process.env.JWT_SECRET || "devsecret", { expiresIn: "7d" });
  res.json({ token });
}
