import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed";
import PostBox from "../components/PostBox";
import SubredditRow from "../components/SubredditRow";
import { GET_SUBREDDIT_LIST_BY_LIMIT } from "../graphql/queries";

const Home: NextPage = () => {
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
