import { PrismaClient } from '@prisma/client';
import path from 'path';
import bcrypt from 'bcrypt';
import { readdir, readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';
import { fieldTypes } from './types';
const keysOrder = Object.keys(fieldTypes);
const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const directory = path.join(__dirname, 'csv');
async function processCsvFiles() {
    const files = await readdir(directory);
    const csvFiles = files.filter(f => f.endsWith('.csv'));
    for (const modelName of keysOrder) {
        const filename = `${modelName}.csv`;
        if (!csvFiles.includes(filename))
            continue;
        const fullpath = path.join(directory, filename);
        const content = await readFile(fullpath, 'utf-8');
        const rawRecords = parse(content, {
            columns: true,
            skip_empty_lines: true
        });
        const cleanedData = await Promise.all(rawRecords.map((row) => castRow(modelName, row)));
        await seedData(modelName, cleanedData);
    }
}
processCsvFiles().catch(console.error);
const seedData = async (model, data) => {
    try {
        const modelName = String(model);
        console.log(modelName);
        await prisma[model].createMany({
            data,
            skipDuplicates: true
        });
    }
    catch (error) {
        console.error(`Failed to seed ${String(model)}:`, error);
    }
};
const castRow = async (model, row) => {
    const schema = fieldTypes[model];
    const converted = {};
    for (const [key, value] of Object.entries(row)) {
        const type = schema[key] || 'string';
        const val = value?.toString().trim();
        if (type === 'number') {
            converted[key] = Number(val);
        }
        else if (type === 'boolean') {
            if (val === "0") {
                converted[key] = false;
            }
            else {
                converted[key] = true;
            }
        }
        else if (type === 'date') {
            converted[key] = new Date(val);
        }
        else {
            if (key === 'password') {
                converted[key] = await bcrypt.hash(val, 10);
            }
            else {
                converted[key] = val;
            }
        }
    }
    return converted;
};
