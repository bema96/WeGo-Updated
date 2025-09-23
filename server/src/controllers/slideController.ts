import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

const toDTO = (s: any) => ({
  id: s.id,
  text: s.text,
  image: s.cloudSecureUrl ?? s.imageUrl ?? null, 
});

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.slide.findMany();
    res.json(data.map(toDTO));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch slides' });
  }
};