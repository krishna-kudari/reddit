import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed";
import PostBox from "../components/PostBox";
import SubredditRow from "../components/SubredditRow";
import { GET_SUBREDDIT_LIST_BY_LIMIT } from "../graphql/queries";
import {useSession} from 'next-auth/react';
import useGoogleIdentify from '../hooks/useGoogleIdentify'
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
// import { Subreddit} from "../typings";
import NextAuth, { DefaultSession } from "next-auth"
import { supabase } from "../supabaseClient";

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
const Home: NextPage = () => {
  const {data: session} = useSession();
  // const [userData, setUserData] = useState<any>();
  // const { supabaseAccessToken } = session;

  // const supabase = createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  //   {
  //     global: {
  //       headers: {
  //         Authorization: `Bearer ${supabaseAccessToken}`,
  //       },
  //     },
  //   }
  // );
  // // Now you can query with RLS enabled.
  // supabase
  //   .from("users")
  //   .select("*")
  //   .then(({data}) => setUserData(data));

  //   console.log("userData:",userData);
    
  const nextAuthOpt = {
    redirect: false
  }
  const googleOpt = {
    prompt_parent_id : 'oneTap',
    isOneTap : true
  }
  const {isSignedIn} =useGoogleIdentify({
    nextAuthOpt, googleOpt
  })
  const { data } = useQuery(GET_SUBREDDIT_LIST_BY_LIMIT,{
    variables:{limit:5}
  });

  const subreddits : Subreddit[] = data?.getSubredditListByLimit;
  return (
    <div className="my-7 max-w-5xl mx-auto">
      <Head>
        <title>Reddit 2.0 clone</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      {
        !isSignedIn ?(
          <div id="oneTap" className="fixed right-0 z-50" />
        ):null
      }

      {/* postbox */}
      <PostBox />

      {/* Feed */}
      <div className="flex">
        <Feed />

        <div className={`sticky rounded-sm border border-gray-300 bg-white top-40 mx-5  mt-5 hidden lg:inline h-fit w-auto min-w-[300px]`}> 
          <p className="font-bold text-md  p-4 pb-3">Top Communities</p>
          <div>
            {/* List subreddits */}
            {subreddits?.map((subreddit, index) => (
              <SubredditRow key={subreddit.id} topic={`${subreddit.topic}`} index={index}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
