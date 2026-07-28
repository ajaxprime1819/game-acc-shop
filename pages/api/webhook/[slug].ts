import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../src/lib/prisma";
import { decrypt } from "../../../src/lib/crypto";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  const provider = await prisma.provider.findUnique({
    where: { slug: String(slug) },
    include: { credentials: true }
  });
  if (!provider) return res.status(404).json({ error: "Provider not found" });

  // For demo: accept JSON payload, store transaction, and if status=success mark success.
  const payload = req.body;
  const providerTxId = payload.transaction_id || payload.txid || null;
  const status = payload.status || payload.code || "pending";
  const amount = payload.amount || 0;

  // idempotency: dedupe on providerTxId
  if (providerTxId) {
    const existing = await prisma.transaction.findFirst({ where: { providerTxId, providerId: provider.id } });
    if (existing) {
      return res.status(200).json({ ok: true, note: "already processed" });
    }
  }

  const tx = await prisma.transaction.create({
    data: {
      providerId: provider.id,
      providerTxId,
      type: "redeem",
      amount: Number(amount),
      status: String(status),
      rawPayload: JSON.stringify(payload).slice(0, 2000)
    }
  });

  if (String(status).toLowerCase() === "success" || String(status) === "200") {
    // For demo: credit nothing, but could credit wallet / mark order paid based on mapping.
    await prisma.transaction.update({ where: { id: tx.id }, data: { status: "success" } });
    // TODO: mapping to order or wallet as per provider config
  }

  res.json({ ok: true });
}
