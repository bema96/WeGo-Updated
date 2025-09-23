'use strict';
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { v2: cloudinary } = require('cloudinary');
const { PrismaClient } = require('@prisma/client');

if (!process.env.CLOUDINARY_URL) {
  console.error('Missing CLOUDINARY_URL in .env');
  process.exit(1);
}

const prisma = new PrismaClient();
cloudinary.config(process.env.CLOUDINARY_URL);

// CLI args
const [, , table, csvPathArg, imageColArg] = process.argv;
const TABLES = /** @type {const} */ (['users', 'slides', 'bagsizes']);

if (!table || !csvPathArg || !TABLES.includes(table)) {
  console.error('Usage: node scripts/csv-cloudinary-backfill.js <users|slides|bagsizes> <csvPath> [imageCol]');
  process.exit(1);
}

const CSV_PATH = path.resolve(process.cwd(), csvPathArg);
if (!fs.existsSync(CSV_PATH)) {
  console.error('CSV not found:', CSV_PATH);
  process.exit(1);
}

const DEFAULT_COL = table === 'bagsizes' ? 'iconUrl' : 'imageUrl';
const IMAGE_COL = imageColArg || DEFAULT_COL;

const cfg = {
  users:    { folder: 'wego/users',   update: (id, d) => prisma.user.update({    where: { id }, data: d }) },
  slides:   { folder: 'wego/slides',  update: (id, d) => prisma.slide.update({   where: { id }, data: d }) },
  bagsizes: { folder: 'wego/icons',   update: (id, d) => prisma.bagsize.update({ where: { id }, data: d }) },
}[table];


function remapProjectAsset(src) {
  if (src.startsWith('/images/')) {
    return path.resolve(process.cwd(), 'assets', src.slice(1)); 
  }
  if (src.startsWith('images/')) {
    return path.resolve(process.cwd(), 'assets', src);         
  }
  return src;
}

async function uploadSource(src, publicId) {
  // HTTP
  if (/^https?:\/\//i.test(src)) {
    return cloudinary.uploader.upload(src, { public_id: publicId, folder: cfg.folder, overwrite: false });
  }
  // Lokal fil
  const remapped = remapProjectAsset(src);
  const abs = path.isAbsolute(remapped) ? remapped : path.resolve(process.cwd(), remapped);
  if (!fs.existsSync(abs)) throw new Error('File not found: ' + abs);
  return cloudinary.uploader.upload(abs, { public_id: publicId, folder: cfg.folder, overwrite: false });
}

(async () => {
  let ok = 0, fail = 0;

  try {
    const csvRaw = fs.readFileSync(CSV_PATH, 'utf8');
    const rows = parse(csvRaw, { columns: true, skip_empty_lines: true, comment: '#' });

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const id = Number(r.id);
      const src = (r[IMAGE_COL] || '').trim();

      if (!Number.isFinite(id) || !src) { fail++; continue; }

      try {
        const publicId = `${table}_${id}`;
        const out = await uploadSource(src, publicId);

        await cfg.update(id, {
          cloudPublicId:  out.public_id,
          cloudSecureUrl: out.secure_url,
        });

        ok++;
        if (i % 25 === 0) console.log(`[${i}/${rows.length}] OK ${table} ${id} → ${out.public_id}`);
      } catch (e) {
        fail++;
        console.error(`FAIL ${table} ${id}:`, e.message || e);
      }
    }
    console.log(`Done. OK=${ok} FAIL=${fail}`);
  } catch (e) {
    console.error('Fatal:', e);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
})();
