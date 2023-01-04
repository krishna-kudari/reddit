import type { NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed";
import PostBox from "../components/PostBox";

const Home: NextPage = () => {
  return (
    <div className="my-7 max-w-5xl mx-auto">
      <Head>
        <title>Reddit 2.0 clone</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      {/* postbox */}
      <PostBox />

      {/* Feed */}
      <div className="flex ">
        <Feed />
      </div>
    </div>
  );
};

export default Home;
