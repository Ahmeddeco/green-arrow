import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { nextCookies } from "better-auth/next-js"
import { admin } from "better-auth/plugins"
import prisma from "./prisma"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  baseURL: process.env.BETTER_AUTH_URL as string,
  /* ---------------------------- socialProviders --------------------------- */
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  /* --------------------------------- roles -------------------------------- */
  roles: {
    owner: {},
    admin: {},
    user: {},
    client: {},
  },

  /* -------------------------------- plugins ------------------------------- */
  plugins: [
    admin({
      adminRoles: ["admin"],
      defaultRole: "user",
    }),
    nextCookies(), // make sure this is the last plugin in the array
  ],

})