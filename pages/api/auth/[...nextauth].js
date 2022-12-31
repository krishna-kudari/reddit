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
    }),
    
  ],
});
