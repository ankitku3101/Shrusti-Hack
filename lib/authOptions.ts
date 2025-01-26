import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import School from "@/models/School";
import dbConnect from "@/lib/mongodb";

const ADMIN_USER_ID = process.env.ADMIN_USER_ID; // Admin email from environment variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // Admin password from environment variable

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials: any) {
        try {
          const { email, password } = credentials;

          if (!email || !password) {
            throw new Error("Email and password are required");
          }

          await dbConnect();

          // Check if the user is an admin
          if (email === ADMIN_USER_ID) {
            if (password !== ADMIN_PASSWORD) {
              throw new Error("Invalid email or password");
            }
            return {
              id: "admin",
              email: ADMIN_USER_ID,
              name: "Admin",
              role: "admin",
            };
          }

          // Otherwise, check if the user is in the database
          const user = await School.findOne({ email });

          if (!user) {
            throw new Error("Invalid email or password");
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error("Invalid email or password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: "user", 
          };
        } catch (error) {
          console.error("Authorization error:", error.message);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;   
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;  
      }
      return session;
    },
  },
};
