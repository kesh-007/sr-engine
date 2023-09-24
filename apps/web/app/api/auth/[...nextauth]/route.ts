import { loginApi } from "@/server";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const   authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials;
       const result= loginApi(email,password)
       if (result)
       {
        return result
       }
       else{
        return null
       }

      }
    })
  ],
  
  pages: {
    signIn: '/login', 
    error:'/login',
    signOut:'/login'

  },
secret: process.env["NEXTAUTH_SECRET"] ,


  
};


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }