import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Preniche database...");

  // 1. Create Sample Users
  const user1 = await prisma.user.upsert({
    where: { email: 'dimas.aditya@itb.ac.id' },
    update: {},
    create: {
      name: 'Dimas Aditya Pratama',
      email: 'dimas.aditya@itb.ac.id',
      passwordHash: '$2b$10$epOz3f51w3mIqFj1.YfF0u1y63zJ4s.W6BqWb8hQ8k0a1a0q.O/1q', // hashed password
      campusName: 'Institut Teknologi Bandung (ITB)',
      faculty: 'Sekolah Teknik Elektro dan Informatika (STEI)',
      major: 'Teknik Informatika',
      batchYear: 2022,
      kostArea: 'Dago Asri (500m dari Gerbang Belakang ITB)',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      isVerified: true,
      rating: 4.9,
      reviewCount: 18,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'siti.rahma@ui.ac.id' },
    update: {},
    create: {
      name: 'Siti Rahma Azzahra',
      email: 'siti.rahma@ui.ac.id',
      passwordHash: '$2b$10$epOz3f51w3mIqFj1.YfF0u1y63zJ4s.W6BqWb8hQ8k0a1a0q.O/1q',
      campusName: 'Universitas Indonesia (UI)',
      faculty: 'Fakultas MIPA',
      major: 'Kimia',
      batchYear: 2021,
      kostArea: 'Kukusan Teknik (Kutek UI Depok)',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      isVerified: true,
      rating: 5.0,
      reviewCount: 24,
    },
  });

  // 2. Create Categories
  const catBuku = await prisma.category.upsert({
    where: { slug: 'buku-diktat' },
    update: {},
    create: {
      name: 'Buku & Diktat Kuliah',
      slug: 'buku-diktat',
      description: 'Diktat resmi, buku referensi, modul praktikum, dan catatan kuliah',
      iconName: 'BookOpen',
      displayOrder: 1,
    },
  });

  const catKost = await prisma.category.upsert({
    where: { slug: 'peralatan-kost' },
    update: {},
    create: {
      name: 'Peralatan Kost',
      slug: 'peralatan-kost',
      description: 'Kulkas mini, dispenser, kipas angin, meja belajar lipat',
      iconName: 'Home',
      displayOrder: 2,
    },
  });

  // 3. Create Sample Products
  await prisma.product.create({
    data: {
      title: 'Buku Diktat Kalkulus Purcell Edisi 9 Terjemahan Bahasa Indonesia',
      description: 'Wajib untuk TPB Semester 1. Ada sampul plastik mika, coretan stabilo hanya di bab 1-3 untuk rumus.',
      price: 65000,
      originalPrice: 165000,
      transactionType: 'FOR_SALE' as any,
      condition: 'LIGHTLY_USED' as any,
      status: 'AVAILABLE' as any,
      images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'],
      campusName: 'Institut Teknologi Bandung (ITB)',
      kostArea: 'Dago Asri',
      preferredMeetingPoint: 'Perpustakaan Pusat ITB (Lantai 1)',
      courseName: 'Kalkulus IA',
      courseCode: 'MA1101',
      lecturerName: 'Tim Dosen Matematika ITB',
      sellerId: user1.id,
      categoryId: catBuku.id,
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
