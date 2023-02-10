import nextAuth from "next-auth";
import RedditProvider from "next-auth/providers/reddit";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider  from 'next-auth/providers/credentials';
import { OAuth2Client } from "google-auth-library";
import {SupabaseAdapter} from '@next-auth/supabase-adapter'
import { createClient } from "@supabase/supabase-js"
// import { Database } from "../../../node_modules/@next-auth/supabase-adapter/src/database.types"
// import {
//   Adapter,
//   AdapterSession,
//   AdapterUser,
//   VerificationToken,
// } from "next-auth/adapters"
import {supabase} from '../../../supabaseClient';

import jwt from "jsonwebtoken"

require("dotenv").config();
// console.log(process.env);

const googleAuthClient = new OAuth2Client(process.env.CLIENT_GOOGLE_ID);

export default nextAuth({
  //configure onr or more authentication providers
  providers: [
    RedditProvider({
      clientId: process.env.CLIENT_REDDIT_ID,
      clientSecret: process.env.CLIENT_REDDIT_SECRET,
    }),
    GitHubProvider({
        clientId: process.env.CLIENT_GITHUB_ID,
        clientSecret: process.env.CLIENT_GITHUB_SECRET,
    }),
    GoogleProvider({
        clientId: process.env.CLIENT_GOOGLE_ID,
        clientSecret: process.env.CLIENT_GOOGLE_SECRET,
    }),
    EmailProvider({//NODE_TLS_REJECT_UNAUTHORIZED='0'
      server:{
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    CredentialsProvider({
      id: 'myRedditClone',
      name: 'myRedditClone',
      credentials: {
        credential: {type: 'text'},
      },
      authorize: async (credentials)=>{
        const token = credentials.credential
        const ticket = await googleAuthClient.verifyIdToken({
          idToken: token,
          audience: process.env.CLIENT_GOOGLE_ID
        })
        const payload = ticket.getPayload()
        if(!payload){
          throw new Error('Cannot extract payload from signin token')
          
        }
        const {email, name,sub,given_name,family_name,email_verified, picture:image,} = payload;
        if(!email) {
          throw new Error('Email not available');
        }
        // console.log("payload:---",payload);
        // const adapter = SupabaseAdapter({
        //   url: process.env.SUPABASE_PROJECT_URL,
        //   secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
        // })
        const supabaseclient = createClient(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_SERVICE_ROLE_KEY
          , {
          db: { schema: "next_auth" },
          // global: {
          //   // headers: { "X-Client-Info": "@next-auth/supabase-adapter@0.1.0" },
          //   headers: { 'X-Client-Info': 'supabase-js/2.2.3' },
          // },
        }
        )
        console.log(supabaseclient);
        const { data, error } = await supabaseclient.from("users").select().eq("email", email).maybeSingle();
        console.log(error);
        let user = data;
        // const res = await supabaseclient.from("post").select("*").eq("title","next");
        // console.log("res--",res);
        // let user = await adapter.getUserByEmail(email);
        console.log('userByEmail:---',user);
        if(!user) {
          console.log("creating");
          user  = {email, name , image}
          // const res = await supabaseclient.from("users").insert([{
          //   name: name,
          //   email:email,
          //   image:image,
          //   emailVerified: email_verified?.toISOString(),
          // }]);
          
          // user = await adapter.createUser({
          //   name: [given_name, family_name].join(' '),
          //   email,
          //   image,
          //   email_verified: email_verified ? new Date() : undefined,
          // })
          // console.log("data-error:",res);
        }
        console.log("userCreated:----",user);
        // const account = user && (await adapter.getUserByAccount({provider: 'google',id:sub}));
        // console.log("accountget:---",account);
        // if(!account && user){
        //   await adapter.linkAccount({
        //     userId: user.id,
        //     provider: 'google',
        //     providerAccountID:'sub',
        //     accessToken: null,
        //     accessTokenExpires: null,
        //     refresh_token: null,
        //   })
        // }
        // console.log("linkedaccount:--",account);
          // const user  = {email, name , image}
          console.log("user----",user);
          return user;
      }
    })
  ]
  ,adapter: SupabaseAdapter({
    url: process.env.SUPABASE_PROJECT_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  })
  ,callbacks: {
      // async jwt({ token, account, profile }) {
      //   // Persist the OAuth access_token to the token right after signin
      //   if (account) {
      //     token.accessToken = account.access_token
      //   }
      //   console.log("jwt:",token,account,profile);
      //   return token
      // },
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.
        // session.accessToken = token?.accessToken;
        // session.user.id = token?.id;
        // console.log("session:----",session,token,user);
        const signingSecret = process.env.SUPABASE_JWT_SECRET
        if (signingSecret) {
          const payload = {
            aud: "authenticated",
            exp: Math.floor(new Date(session.expires).getTime() / 1000),
            sub: user?.id,
            email: user?.email,
            role: "authenticated",
          }
          session.supabaseAccessToken = jwt.sign(payload, signingSecret)
          console.log("session-----",session,);
        }
        return session
      }
    }
    ,
    pages:{
      signIn: '/auth/login'
    },
    // secret: process.env.SUPABASE_JWT_SECRET,
    session: {
      strategy:'jwt',
    },
    // jwt: {
    //   secret: process.env.SUPABASE_JWT_SECRET
    // },
    theme: {
      colorScheme: 'light'
    }
});
