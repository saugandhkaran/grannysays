import prisma from "./db";

export const getSayings = async (id: string) => {
  const sayings = await prisma.grannySaying.findMany({
    where: {
      tipId: id,
    },
    include: {
      tip: true,
    },
  });
  if (!sayings) {
    return {};
  }
  const formattedSayings = sayings.map((saying) => ({
    id: saying.id,
    country: saying.country,
    saying: saying.saying,
    verified: saying.verified,
    tipId: saying.tipId,
  }));
  return {
    sayings: formattedSayings,
    tip: sayings[0].tip,
  }
};

