// scripts/seed-from-csv.js
'use strict';
require('dotenv').config();

const fs = require('fs');
const { parse } = require('csv-parse/sync');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

// ---------- utils ----------
const readCsv = (file) => parse(fs.readFileSync(file, 'utf8'), { columns: true, skip_empty_lines: true, comment: '#' });
const I = (v) => (v===''||v==null) ? null : Number(v);
const S = (v) => (v===''||v==null) ? null : String(v);
const B = (v) => {
  if (typeof v === 'boolean') return v;
  const s = (v ?? '').toString().trim().toLowerCase();
  return ['1','true','yes','y'].includes(s);
};
const D = (v) => v ? new Date(v) : new Date();

// generisk seed: læs CSV → kør builder(row) → upsert
async function seed(label, csvPath, builder) {
  const rows = readCsv(csvPath);
  for (const r of rows) {
    const { where, create, update, model } = await builder(r);
    await model.upsert({ where, create, update });
  }
  console.log(`✔ ${label} (${rows.length})`);
}

// ---------- kør i rækkefølge ----------
(async () => {
  const base = './prisma/csv';

  // Users
  await seed('users', `${base}/user.csv`, async (r) => {
    const id = I(r.id);
    const password =
      r.passwordHash ? r.passwordHash :
      r.password     ? await bcrypt.hash(String(r.password), 10) : '$2b$10$z0W5Q0Q0Q0Q0Q0Q0Q0Q0Oe8m2m3m4m5m6m7m8m9m0m1m2m3m4'; 
    const data = {
      firstname: r.firstname ?? 'Ikke navngivet',
      lastname:  r.lastname  ?? 'Ikke navngivet',
      email:     r.email,
      password,
      description: S(r.description),
      isActive: r.isActive !== undefined ? B(r.isActive) : true,
      imageUrl: S(r.imageUrl),         
      refreshToken: r.refreshToken ?? '',
    };
    return {
      model: db.user,
      where: { id },
      create: { id, ...data },
      update: data,
    };
  });

  // Bagsizes
  await seed('bagsizes', `${base}/bagsize.csv`, (r) => {
    const id = I(r.id);
    const data = { name: r.name, description: r.description ?? '', iconUrl: S(r.iconUrl) };
    return { model: db.bagsize, where: { id }, create: { id, ...data }, update: data };
  });

  // Slides
  await seed('slides', `${base}/slide.csv`, (r) => {
    const id = I(r.id);
    const data = { text: r.text, imageUrl: S(r.imageUrl) };
    return { model: db.slide, where: { id }, create: { id, ...data }, update: data };
  });

  // Content
  await seed('content', `${base}/content.csv`, (r) => {
    const id = I(r.id);
    const data = { title: r.title, content: r.content ?? '' };
    return { model: db.content, where: { id }, create: { id, ...data }, update: data };
  });

  // Trips
  await seed('trips', `${base}/trip.csv`, (r) => {
    const id = I(r.id);
    const data = {
      userId: I(r.userId),
      departureDate: D(r.departureDate),
      addressDeparture: r.addressDeparture,
      cityDeparture: r.cityDeparture,
      addressDestination: r.addressDestination,
      cityDestination: r.cityDestination,
      routeDeviation: I(r.routeDeviation) ?? 0,
      seatsTotal: I(r.seatsTotal) ?? 1,
      pricePerSeat: S(r.pricePerSeat) ?? '0',
      bagSizeId: I(r.bagSizeId),
      comment: r.comment ?? '',
      allowChildren: B(r.allowChildren),
      allowSmoking:  B(r.allowSmoking),
      allowMusic:    B(r.allowMusic),
      allowPets:     B(r.allowPets),
      hasComfort:    B(r.hasComfort),
      useFerry:      B(r.useFerry),
      isElectric:    B(r.isElectric),
    };
    return { model: db.trip, where: { id }, create: { id, ...data }, update: data };
  });

  // Bookings
  await seed('bookings', `${base}/booking.csv`, (r) => {
    const id = I(r.id);
    const data = { tripId: I(r.tripId), userId: I(r.userId), comment: r.comment ?? '', numSeats: I(r.numSeats) ?? 1 };
    return { model: db.booking, where: { id }, create: { id, ...data }, update: data };
  });

  // Reviews
  await seed('reviews', `${base}/review.csv`, (r) => {
    const id = I(r.id);
    const data = {
      numStars: I(r.numStars) ?? 5,
      comment: r.comment ?? '',
      reviewerId: I(r.reviewerId),
      reviewedUserId: I(r.reviewedUserId),
    };
    return { model: db.review, where: { id }, create: { id, ...data }, update: data };
  });

  console.log('Seed done');
  await db.$disconnect();
})().catch(async (e) => {
  console.error(e);
  await db.$disconnect();
  process.exit(1);
});
