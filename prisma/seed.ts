import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Preniche database khusus Untag Surabaya...");

  // 1. Create Sample Users (Untag Surabaya)
  const user1 = await prisma.user.upsert({
    where: { email: 'dimas.pratama@gmail.com' },
    update: {},
    create: {
      name: 'Dimas Aditya Pratama',
      email: 'dimas.pratama@gmail.com',
      campusEmail: '1462200045@student.untag-sby.ac.id',
      isVerifiedStudent: true,
      passwordHash: '$2b$10$epOz3f51w3mIqFj1.YfF0u1y63zJ4s.W6BqWb8hQ8k0a1a0q.O/1q',
      campusName: 'Universitas 17 Agustus 1945 Surabaya',
      faculty: 'Fakultas Teknik',
      major: 'Teknik Informatika',
      batchYear: 2022,
      kostArea: 'Nginden Semolo (Dekat Gerbang Belakang Untag)',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      isVerified: true,
      rating: 4.9,
      reviewCount: 18,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'siti.rahma@gmail.com' },
    update: {},
    create: {
      name: 'Siti Rahma Azzahra',
      email: 'siti.rahma@gmail.com',
      campusEmail: 'siti.rahma@untag-sby.ac.id',
      isVerifiedStudent: true,
      passwordHash: '$2b$10$epOz3f51w3mIqFj1.YfF0u1y63zJ4s.W6BqWb8hQ8k0a1a0q.O/1q',
      campusName: 'Universitas 17 Agustus 1945 Surabaya',
      faculty: 'Fakultas Ilmu Sosial & Ilmu Politik',
      major: 'Ilmu Komunikasi',
      batchYear: 2021,
      kostArea: 'Semolowaru Elok',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      isVerified: true,
      rating: 5.0,
      reviewCount: 24,
    },
  });

  // 2. Create 5 Kategori Spesifik Untag Surabaya
  const catKos = await prisma.category.upsert({
    where: { slug: 'peralatan-kos' },
    update: {},
    create: {
      name: 'Peralatan Kos',
      slug: 'peralatan-kos',
      description: 'Kasur busa, kipas angin, alat masak, lemari pakaian, meja belajar lipat',
      iconName: 'Home',
      displayOrder: 1,
    },
  });

  const catPraktikum = await prisma.category.upsert({
    where: { slug: 'alat-praktikum' },
    update: {},
    create: {
      name: 'Alat Praktikum & Perkuliahan',
      slug: 'alat-praktikum',
      description: 'Jas lab, alat gambar teknik, papan alas ujian, perlengkapan rekayasa & teknik',
      iconName: 'FlaskConical',
      displayOrder: 2,
    },
  });

  const catBuku = await prisma.category.upsert({
    where: { slug: 'buku-modul' },
    update: {},
    create: {
      name: 'Buku Kuliah & Modul',
      slug: 'buku-modul',
      description: 'Buku paket, modul praktikum, catatan kuliah & diktat Untag Surabaya',
      iconName: 'BookOpen',
      displayOrder: 3,
    },
  });

  const catFashion = await prisma.category.upsert({
    where: { slug: 'thrift-fashion' },
    update: {},
    create: {
      name: 'Thrift & Fashion',
      slug: 'thrift-fashion',
      description: 'Baju, kemeja ospek/sidang, jaket kampus, sepatu, tas ransel',
      iconName: 'Shirt',
      displayOrder: 4,
    },
  });

  const catGadget = await prisma.category.upsert({
    where: { slug: 'elektronik-gadget' },
    update: {},
    create: {
      name: 'Elektronik & Gadget Kos',
      slug: 'elektronik-gadget',
      description: 'Magicsom, setrika mini, stopkontak kabel, charger, periferal laptop',
      iconName: 'Laptop',
      displayOrder: 5,
    },
  });

  // 3. Create Sample Products
  await prisma.product.create({
    data: {
      title: 'Set Jas Lab Praktikum Kimia/Teknik Untag + Kacamata Safety Krisbow',
      description: 'Ukuran L, bahan katun tebal tidak panas, kancing lengkap. Dipakai praktikum semester lalu di Lab Teknik Untag.',
      price: 60000,
      originalPrice: 125000,
      transactionType: 'FOR_SALE' as any,
      condition: 'LIGHTLY_USED' as any,
      status: 'AVAILABLE' as any,
      images: ['https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80'],
      campusName: 'Universitas 17 Agustus 1945 Surabaya',
      kostArea: 'Nginden Semolo',
      preferredMeetingPoint: 'Gedung Graha Wiyata Untag Surabaya',
      courseName: 'Praktikum Kimia Dasar Rekayasa',
      courseCode: 'TK101',
      lecturerName: 'Dosen Teknik Untag',
      sellerId: user1.id,
      categoryId: catPraktikum.id,
    },
  });

  console.log("Database Untag Surabaya seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
