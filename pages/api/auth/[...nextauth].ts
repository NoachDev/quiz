import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email   : { label: "username", type: "email" },
        password: { label: "password", type: "password" },

      },
      async authorize(credentials) {
        const passwords : string[] = [process.env.AUTH_PASS, process.env.AUTH_PASS_ADM]
        const users     : string[] = [process.env.AUTH_USER, process.env.AUTH_USER_ADM]

        if (passwords.findIndex(k => k==credentials.password) > -1  && users.findIndex(k => k==credentials.email) > -1) {
          return {}
        }
        
        throw new Error("not authorize")

      }
      
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials, token }) {
      if (credentials.password == process.env.AUTH_PASS_ADM && credentials.email == process.env.AUTH_USER_ADM){
        user.UserRole = "Admin"
      }
      else{
        user.UserRole = "Guest"
      }

      return true
    },

    async session({ session, token }) {
      if (token){
        session.user.UserRole = token.UserRole
      }
      
      return session
    },

    async jwt({ token, user }) {
      if (user){
        token.UserRole = user.UserRole
        
      }

      return token
    },
  },
}

export default NextAuth(authOptions)