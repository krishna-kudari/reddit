import nextAuth from "next-auth";
import RedditProvider from "next-auth/providers/reddit";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import {SupabaseAdapter} from '@next-auth/supabase-adapter'
import jwt from "jsonwebtoken"

require("dotenv").config();
// console.log(process.env);

export default nextAuth({
  //configure onr or more authentication providers
  providers: [
    RedditProvider({
      clientId: process.env.CLIENT_REDDIT_ID,
      clientSecret: process.env.CLIENT_REDDIT_SECRET,
    }),
    GitHubProvider({
        clientId: process.env.CLIENT_GITHUB_ID,
        clientSecret: process.env.CLIENT_GITHUB_SECRET
    }),
    GoogleProvider({
        clientId: process.env.CLIENT_GOOGLE_ID,
        clientSecret: process.env.CLIENT_GOOGLE_SECRET,
    }),
    EmailProvider({
      server:{
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    })
  ],adapter: SupabaseAdapter({
    url: process.env.SUPABASE_PROJECT_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }),callbacks: {
      // async jwt({ token, account }) {
      //   // Persist the OAuth access_token to the token right after signin
      //   if (account) {
      //     token.accessToken = account.access_token
      //   }
      //   return token
      // },
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.
        // session.accessToken = token.accessToken
        const signingSecret = process.env.SUPABASE_JWT_SECRET
        if (signingSecret) {
          const payload = {
            aud: "authenticated",
            exp: Math.floor(new Date(session.expires).getTime() / 1000),
            sub: user.id,
            email: user.email,
            role: "authenticated",
          }
          session.supabaseAccessToken = jwt.sign(payload, signingSecret)
          // console.log(session);
        }
        return session
      }
    },
    pages:{
      signIn: '/auth/login'
    }
});
