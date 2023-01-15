type Comment = {
  created_at: DateTime;
  id: !ID;
  post_id: ID;
  text: String;
  username: String;
};

type Post = {
  body: String;
  created_at: DateTime;
  id: !ID;
  image: String;
  subreddit_id: ID;
  title: String;
  username: String;
  comments: Comment[];
  votes: Vote[];
  subreddit: Subreddit[];
}

type Subreddit = {
  created_at: DateTime;
  topic: !String;
  id: !ID;
}

type Vote = {
  created_at: DateTime;
  id: !ID;
  post_id: ID;
  upvote: Boolean;
  username: String;
}

// import NextAuth, { DefaultSession } from "next-auth"

// declare module "next-auth" {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     // A JWT which can be used as Authorization header with supabase-js for RLS.
//     supabaseAccessToken?: string
//     user: {
//       /** The user's postal address. */
//       address: string
//     } & DefaultSession["user"]
//   }
// }