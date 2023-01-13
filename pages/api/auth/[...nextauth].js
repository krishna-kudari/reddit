import nextAuth from "next-auth";
import RedditProvider from "next-auth/providers/reddit";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

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
    })
  ],callbacks: {
      async jwt({ token, account }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
          token.accessToken = account.access_token
        }
        return token
      },
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.
        session.accessToken = token.accessToken
        return session
      }
    }
});
