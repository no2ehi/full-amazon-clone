import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "./lib/mongodb"

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
//   callbacks: {
//     session({ session, token, user }) {
//       return session // The return type will match the one returned in `useSession()`
//     },
//   },
//   pages: {
//     // signIn: "/signin"
//   },
  session: {
    strategy: "jwt"
  },
  secret: process.env.JWT_SECRET,
}

export default NextAuth(authOptions)