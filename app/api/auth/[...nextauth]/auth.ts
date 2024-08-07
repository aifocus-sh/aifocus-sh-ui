import CredentialsProvider from "next-auth/providers/credentials";
import db from '@/lib/db'
import bcrypt from 'bcrypt'
import { NextAuthOptions } from "next-auth";

export const authOptions:NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password", placeholder: "*****" },
        },
        async authorize(credentials, req) {
  
          const userFound = await db.user.findUnique({
              where: {
                  email: credentials?.email
              }
          })
  
          if (!userFound) throw new Error('No user found')
  
          const matchPassword = await bcrypt.compare(credentials?.password!, userFound.password)
  
          if (!matchPassword) throw new Error('Wrong password')
  
          return {
              id: userFound.id.toString(),
              name: userFound.username,
              email: userFound.email,
          }
        },
      }),
    ],
    pages: {
      signIn: "/auth/login",
    }
  };