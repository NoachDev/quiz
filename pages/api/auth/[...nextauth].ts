import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Email from "next-auth/providers/email"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },

      },
      async authorize(credentials) {

        if (credentials.password == process.env.AUTH_PASS && credentials.username == process.env.AUTH_USER) {
          return {}
        }
        
        throw new Error("not authorize")


      }

    })
  ],
}

export default NextAuth(authOptions)