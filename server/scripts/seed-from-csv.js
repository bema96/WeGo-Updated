// scripts/seed-from-csv.js
'use strict';
require('dotenv').config();
const fs = require('fs');
const { parse } = require('csv-parse/sync');
const bcrypt = require('bcrypt');
const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

function readCsv(file) {
  const raw = fs.readFileSync(file, 'utf8');
  return parse(raw, { columns: true, skip_empty_lines: true, comment: '#' });
}
const toInt = (v) => (v===undefined||v==="") ? null : Number(v);
const toBool = (v) => {
  if (typeof v === 'boolean') return v;
  const s = String(v).trim().toLowerCase();
  return ['1','true','yes','y'].includes(s);
};
const toStr = (v) => (v===undefined||v==="") ? null : String(v);
const toDecStr = (v) => (v===undefined||v==="") ? null : String(v);

async function seedUsers(csv) {
  const rows = readCsv(csv);
  for (const r of rows) {
    const id = toInt(r.id);
    const password = r.passwordHash ? r.passwordHash : (r.password ? await bcrypt.hash(String(r.password), 10) : 'changeme');
    await prisma.user.upsert({
      where: { id },
      update: {
        firstname: r.firstname ?? 'Ikke navngivet',
        lastname:  r.lastname  ?? 'Ikke navngivet',
        email:     r.email,
        password,
        description: toStr(r.description),
        isActive: r.isActive !== undefined ? toBool(r.isActive) : true,
        imageUrl: toStr(r.imageUrl),              // legacy (backfill tager sig af cloud-felter)
      },
      create: {
        id,
        firstname: r.firstname ?? 'Ikke navngivet',
        lastname:  r.lastname  ?? 'Ikke navngivet',
        email:     r.email,
        password,
        description: toStr(r.description),
        isActive: r.isActive !== undefined ? toBool(r.isActive) : true,
        refreshToken: r.refreshToken ?? '',
        imageUrl: toStr(r.imageUrl),
      }
    });
  }
}

async function seedBagsizes(csv) {
  const rows = readCsv(csv);
  for (const r of rows) {
    const id = toInt(r.id);
    await prisma.bagsize.upsert({
      where: { id },
      update: { name: r.name, description: r.description ?? '', iconUrl: toStr(r.iconUrl) },
      create: { id, name: r.name, description: r.description ?? '', iconUrl: toStr(r.iconUrl) }
    });
  }
}

async function seedSlides(csv) {
  const rows = readCsv(csv);
  for (const r of rows) {
    const id = toInt(r.id);
    await prisma.slide.upsert({
      where: { id },
      update: { text: r.text, imageUrl: toStr(r.imageUrl) },
      create: { id, text: r.text, imageUrl: toStr(r.imageUrl) }
    });
  }
}

async function seedContent(csv) {
  const rows = readCsv(csv);
  for (const r of rows) {
    const id = toInt(r.id);
    await prisma.content.upsert({
      where: { id },
      update: { title: r.title, content: r.content ?? '' },
      create: { id, title: r.title, content: r.content ?? '' }
    });
  }
}

async function seedTrips(csv) {
  const rows = readCsv(csv);
  for (const r of rows) {
    const id = toInt(r.id);
    await prisma.trip.upsert({
      where: { id },
      update: {
        userId: toInt(r.userId),
        departureDate: new Date(r.departureDate),
        addressDeparture: r.addressDeparture,
        cityDeparture: r.cityDeparture,
        addressDestination: r.addressDestination,
        cityDestination: r.cityDestination,
        routeDeviation: toInt(r.routeDeviation) ?? 0,
        seatsTotal: toInt(r.seatsTotal) ?? 1,
        pricePerSeat: toDecStr(r.pricePerSeat) ?? "0",
        bagSizeId: toInt(r.bagSizeId),
        comment: r.comment ?? '',
        allowChildren: toBool(r.allowChildren),
        allowSmoking: toBool(r.allowSmoking),
        allowMusic: toBool(r.allowMusic),
        allowPets: toBool(r.allowPets),
        hasComfort: toBool(r.hasComfort),
        useFerry: toBool(r.useFerry),
        isElectric: toBool(r.isElectric),
      },
      create: {
        id,
        userId: toInt(r.userId),
        departureDate: new Date(r.departureDate),
        addressDeparture: r.addressDeparture,
        cityDeparture: r.cityDeparture,
        addressDestination: r.addressDestination,
        cityDestination: r.cityDestination,
        routeDeviation: toInt(r.routeDeviation) ?? 0,
        seatsTotal: toInt(r.seatsTotal) ?? 1,
        pricePerSeat: toDecStr(r.pricePerSeat) ?? "0",
        bagSizeId: toInt(r.bagSizeId),
        comment: r.comment ?? '',
        allowChildren: toBool(r.allowChildren),
        allowSmoking: toBool(r.allowSmoking),
        allowMusic: toBool(r.allowMusic),
        allowPets: toBool(r.allowPets),
        hasComfort: toBool(r.hasComfort),
        useFerry: toBool(r.useFerry),
        isElectric: toBool(r.isElectric),
      }
    });
  }
}

async function seedBookings(csv) {
  const rows = readCsv(csv);
  for (const r of rows) {
    const id = toInt(r.id);
    await prisma.booking.upsert({
      where: { id },
      update: {
        tripId: toInt(r.tripId),
        userId: toInt(r.userId),
        comment: r.comment ?? '',
        numSeats: toInt(r.numSeats) ?? 1,
      },
      create: {
        id,
        tripId: toInt(r.tripId),
        userId: toInt(r.userId),
        comment: r.comment ?? '',
        numSeats: toInt(r.numSeats) ?? 1,
      }
    });
  }
}

async function seedReviews(csv) {
  const rows = readCsv(csv);
  for (const r of rows) {
    const id = toInt(r.id);
    await prisma.review.upsert({
      where: { id },
      update: {
        numStars: toInt(r.numStars) ?? 5,
        comment: r.comment ?? '',
        reviewerId: toInt(r.reviewerId),
        reviewedUserId: toInt(r.reviewedUserId),
      },
      create: {
        id,
        numStars: toInt(r.numStars) ?? 5,
        comment: r.comment ?? '',
        reviewerId: toInt(r.reviewerId),
        reviewedUserId: toInt(r.reviewedUserId),
      }
    });
  }
}

(async () => {
  try {
    const base = './prisma/csv'; // justér hvis dine filer ligger andetsteds
    await seedUsers(`${base}/user.csv`);
    await seedBagsizes(`${base}/bagsize.csv`);
    await seedSlides(`${base}/slide.csv`);
    await seedContent(`${base}/content.csv`);
    await seedTrips(`${base}/trip.csv`);
    await seedBookings(`${base}/booking.csv`);
    await seedReviews(`${base}/review.csv`);
    console.log('Seed done');
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
})();
