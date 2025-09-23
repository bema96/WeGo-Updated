// controllers/bagsize.controller.ts
import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

const toDTO = (b: { id:number; name:string; description:string|null; iconUrl:string|null; cloudSecureUrl:string|null }) => ({
  id: b.id,
  name: b.name,
  description: b.description,
  iconUrl: b.cloudSecureUrl ?? b.iconUrl ?? null, // <- frontend kan blive ved med at bruge iconUrl
});

export const getRecords = async (_req: Request, res: Response) => {
  try {
    const rows = await prisma.bagsize.findMany({
      select: { id: true, name: true, description: true, iconUrl: true, cloudSecureUrl: true },
      orderBy: { id: "asc" },
    });
    res.json(rows.map(toDTO));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bagsizes" });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  try {
    const row = await prisma.bagsize.findUnique({
      where: { id: Number(req.params.id) },
      select: { id: true, name: true, description: true, iconUrl: true, cloudSecureUrl: true },
    });
    if (!row) return res.status(404).json({ error: "Bagsize not found" });
    res.json(toDTO(row));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bagsize" });
  }
};
