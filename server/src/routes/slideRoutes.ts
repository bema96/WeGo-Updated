import { Router } from 'express';
import { getRecords } from '../controllers/slideController';

const routes = Router();
console.log("slides v2: returning string[]");

routes.get('/', getRecords);

export const slideRoutes = routes;