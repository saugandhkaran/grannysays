import prisma from './db';

export const getTags = async () => {
  prisma.$connect();
  const tags = await prisma.tag.findMany({
    include: {
      tips: {
        include: {
          tip: true,
        },
      },
    },
  });
  prisma.$disconnect();
  return tags;
}

export const addNewTag = async (name: string) => {
  prisma.$connect();
  const tag = await prisma.tag.create({
    data: {
      name,
    },
  });

  prisma.$disconnect();
  return tag;
}

