// src/controllers/slideController.ts
import type { Request, Response } from "express";
import { prisma } from "../prisma.js";

export const getRecords = async (_req: Request, res: Response) => {
  try {
    const rows = await prisma.slide.findMany({
      select: { imageUrl: true, cloudSecureUrl: true },
      orderBy: { id: "asc" },
    });
    const urls = rows
      .map(s => s.cloudSecureUrl ?? s.imageUrl)
      .filter(Boolean) as string[];

    // marker i logs så du kan se at NY kode kører i prod
    console.log("slides v2: returning string[]", urls.length);

    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch slides" });
  }
};
