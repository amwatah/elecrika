import { createTRPCRouter, publicProcedure } from "../trpc";

export const electronicsRouter = createTRPCRouter({
  getElectronics: publicProcedure.query(async ({ ctx }) => {
    const electronics = await ctx.prisma.electronics.findMany();
    return electronics;
  }),
});
