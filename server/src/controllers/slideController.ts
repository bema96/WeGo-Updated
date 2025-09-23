// controllers/slide.controller.ts
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

    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch slides" });
  }
};
