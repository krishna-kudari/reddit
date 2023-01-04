import { useRouter } from "next/router";
import React from "react";
import Avatar from "../../components/Avatar";
import Feed from "../../components/Feed";
import PostBox from "../../components/PostBox";

function Subreddit() {
  const {
    query: { topic },
  } = useRouter();

  return (
    <div className="h-24 bg-red-400 p-8">
      <div className="-mx-8 mt-10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
          <div className="-mt-5">
            <Avatar seed={`${topic}`} large />
          </div>
          <div className="py-2">
            <h1 className="font-semibold text-3xl ">
              Welcome to the r/{topic} subreddit
            </h1>
            <p className="font-bold text-sm text-gray-400">r/{topic}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl mt-5 pb-10">
        <PostBox subreddit={`${topic}`}/>
        <Feed topic={`${topic}`} />
      </div>
    </div>
  );
}

export default Subreddit;
