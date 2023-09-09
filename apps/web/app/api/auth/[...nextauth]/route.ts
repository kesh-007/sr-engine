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

        if (email && password==='changeme') {
          return Promise.resolve({ id: 1, name: "User" });
        } else {
          return Promise.resolve(null);
        }
      }
    })
  ],
  secret: "YourSecretKeyHere" ,
  pages: {
    signIn: '/login', 
  },

  
};


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }