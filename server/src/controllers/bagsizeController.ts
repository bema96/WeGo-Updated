import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

const toDTO = (b: any) => ({
  id: b.id,
  name: b.name,
  description: b.description,
  icon: b.cloudSecureUrl ?? b.iconUrl ?? null, 
});

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.bagsize.findMany();
    res.json(data.map(toDTO));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bagsizes' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.bagsize.findUnique({
      where: { id: Number(id) },
      select: { id: true, name: true, description: true, iconUrl: true, cloudSecureUrl: true },
    });

    res.json(toDTO(data));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bagsize' });
  }
};