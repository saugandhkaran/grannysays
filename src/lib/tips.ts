import prisma from "./db";

// create a single function which can fetch tips and filter the data based on query params sent
export const getTipsByQuery = async (query: {
  page?: number;
  tag?: string;
  search?: string;
}) => {
  const { page = 1, tag, search } = query;
  const tips = await prisma.tip.findMany({
    where: {
      ...(tag && {
        tags: {
          some: {
            tag: {
              name: tag,
            },
          },
        },
      }),
      ...(search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }),
    },
    skip: (page - 1) * 20,
    take: 20,
    orderBy: {
      createdAt: "desc",
    },
  });
  return tips;
}

// get a single tip by id
export const getTipById = async (id: string) => {
  const tip = await prisma.tip.findUnique({
    where: {
      id,
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
      sayings: true,
    },
  });
  return tip;
};

export const addSayingToTip = async (tipId: string, saying: {
  country: string;
  saying: string;
}) => {
  const tip = await prisma.tip.findUnique({
    where: {
      id: tipId,
    },
  });

  if (!tip) {
    throw new Error("Tip not found");
  }

  const grannySaying = await prisma.grannySaying.create({
    data: {
      country: saying.country,
      saying: saying.saying,
      verified: false,
      tip: {
        connect: {
          id: tipId,
        },
      },
    },
  });

  return grannySaying;
}
export const addTagToTip = async (tipId: string, tagId: string) => {
  const tip = await prisma.tip.findUnique({
    where: {
      id: tipId,
    },
  });

  if (!tip) {
    throw new Error("Tip not found");
  }

  const tag = await prisma.tag.findUnique({
    where: {
      id: tagId,
    },
  });

  if (!tag) {
    throw new Error("Tag not found");
  }

  const tipTag = await prisma.tipTag.create({
    data: {
      tip: {
        connect: {
          id: tipId,
        },
      },
      tag: {
        connect: {
          id: tagId,
        },
      },
    },
  });

  return tipTag;
}


export const removeTagFromTip = async (tipId: string, tagId: string) => {
  const tip = await prisma.tip.findUnique({
    where: {
      id: tipId,
    },
  });

  if (!tip) {
    throw new Error("Tip not found");
  }

  const tag = await prisma.tag.findUnique({
    where: {
      id: tagId,
    },
  });

  if (!tag) {
    throw new Error("Tag not found");
  }

  const tipTag = await prisma.tipTag.delete({
    where: {
      tipId_tagId: {
        tipId,
        tagId,
      },
    },
  });

  return tipTag;
}

export const addNewTip = async (tip: {
  title: string;
  description: string;
  tipNumber: number;
  date: Date;
  category: string;
  tags: {name: string}[];
  sayings: {
    country: string;
    saying: string;
  }[];
}) => {
  const { title, description, tipNumber, date, category, tags, sayings } = tip;

  const newTip = await prisma.tip.create({
    data: {
      title,
      description,
      tipNumber,
      date,
      category,
      tags: {
        create: tags.map((tag) => ({
          tag: {
            connectOrCreate: {
              where: {
                name: tag.name,
              },
              create: {
                name: tag.name,
              },
            },
          },
        })),
      },
      sayings: {
        create: sayings.map((saying) => ({
          country: saying.country,
          saying: saying.saying,
          verified: false,
        })),
      },
    },
    include: {
      tags: true,
      sayings: true,
    },
  });

  return newTip;
}

// Update an existing tip
export const updateTip = async (tipId: string, tipData: {
  title: string;
  description: string;
  category: string;
  tags: {
    tagId: string;
    name: string;
  }[];
  sayings: {
    id?: string;
    country: string;
    saying: string;
    verified: boolean;
  }[];
}) => {
  const { title, description, category, tags, sayings } = tipData;

  // First, check if the tip exists
  const existingTip = await prisma.tip.findUnique({
    where: { id: tipId },
    include: {
      tags: true,
      sayings: true,
    },
  });

  if (!existingTip) {
    throw new Error("Tip not found");
  }

  // Update basic tip data
  // const updatedTip = await prisma.tip.update({
  //   where: { id: tipId },
  //   data: {
  //     title,
  //     description,
  //     category,
  //     lastUpdatedAt: new Date(),
  //   },
  // });

  // Update tags - first delete all existing tags
  await prisma.tipTag.deleteMany({
    where: { tipId },
  });

  // Then create new tag relationships
  for (const tag of tags) {
    await prisma.tipTag.create({
      data: {
        tip: { connect: { id: tipId } },
        tag: { connect: { id: tag.tagId } },
      },
    });
  }

  // Handle sayings - process each saying
  // First, get existing saying IDs
  const existingSayingIds = existingTip.sayings.map(s => s.id);
  const updatedSayingIds = sayings.filter(s => s.id).map(s => s.id as string);

  // Delete sayings that are no longer present
  const sayingsToDelete = existingSayingIds.filter(id => !updatedSayingIds.includes(id));
  if (sayingsToDelete.length > 0) {
    await prisma.grannySaying.deleteMany({
      where: {
        id: { in: sayingsToDelete },
      },
    });
  }

  // Update or create sayings
  for (const saying of sayings) {
    if (saying.id && existingSayingIds.includes(saying.id)) {
      // Update existing saying
      await prisma.grannySaying.update({
        where: { id: saying.id },
        data: {
          country: saying.country,
          saying: saying.saying,
          verified: saying.verified,
        },
      });
    } else {
      // Create new saying
      await prisma.grannySaying.create({
        data: {
          country: saying.country,
          saying: saying.saying,
          verified: saying.verified,
          tip: { connect: { id: tipId } },
        },
      });
    }
  }

  // Fetch the fully updated tip with relationships
  const finalTip = await prisma.tip.findUnique({
    where: { id: tipId },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
      sayings: true,
    },
  });

  return finalTip;
}

