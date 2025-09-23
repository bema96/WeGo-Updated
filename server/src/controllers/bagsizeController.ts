// src/controllers/bagsize.controller.ts
import { RequestHandler } from "express";
import { prisma } from "../prisma.js";

const toDTO = (b: any) => ({
  id: b.id,
  name: b.name,
  description: b.description,
  iconUrl: b.cloudSecureUrl ?? b.iconUrl ?? null,
});

export const getRecords: RequestHandler = async (_req, res, next) => {
  try {
    const rows = await prisma.bagsize.findMany({
      select: { id: true, name: true, description: true, iconUrl: true, cloudSecureUrl: true },
      orderBy: { id: "asc" },
    });
    res.json(rows.map(toDTO));
  } catch (err) {
    next(err);
  }
};

export const getRecord: RequestHandler = async (req, res, next) => {
  try {
    const row = await prisma.bagsize.findUnique({
      where: { id: Number(req.params.id) },
      select: { id: true, name: true, description: true, iconUrl: true, cloudSecureUrl: true },
    });
    if (!row) {
      res.status(404).json({ error: "Bagsize not found" });
      return;
    }
    res.json(toDTO(row));
  } catch (err) {
    next(err);
  }
};
