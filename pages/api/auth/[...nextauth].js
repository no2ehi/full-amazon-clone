import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "./lib/mongodb"
import CredentialsProvider from "next-auth/providers/credentials";

import db from "../../../utils/db";
import User from "../../../models/User";
import bcrypt from "bcrypt";

db.connectDb();

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const email  = credentials.email;
        const password = credentials.password;
        const user = await User.findOne({ email })
        if (user) {
          return signInUser({ password, user });
        } else {
          throw new Error("This email does not exist.")
        }
      }
    }),
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
  callbacks: {
    async session({ session, token }) {
      let user = await User.findById(token.sub);
      session.user.id = user.token || user.id.toString();
      session.user.role = user.role || "user";
      return session; 
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.JWT_SECRET,
}

export default NextAuth(authOptions);

export const signInUser = async ({ password, user }) => {
  if(!password) {
    throw new Error("Please enter your password.")
  }
  const testPassword = await bcrypt.compare(password, user.password)
  if(!testPassword) {
    throw new Error("Email or Password is Wrong!")
  } else {
    return user;
  }
}