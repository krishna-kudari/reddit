import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/solid";
import React from "react";
import Avatar from "./Avatar";
import Image from "next/image";
import {
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  SaveIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { Avatar2, tn1, tn2, tn3, youbrokeit2 } from "../assets";
import TimeAgo from "react-timeago";
import Link from "next/link";

import { Jelly } from "@uiball/loaders";

type Props = {
  post: Post;
};

function Post({ post }: Props) {
  if (!post)
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} speed={0.9} color="#FF4501" />
      </div>
    );

  return (
    <Link href={`/post/${post.id}`}>
      <div className="flex drop-shadow-md w-auto rounded-lg  h-auto bg-white mt-5">
        <div className=" p-2 ">
          <ArrowUpIcon className="h-8 p-1 text-gray-400 border hover:text-red-500 rounded-md" />
          <p className="text-center font-bold">{post.votes.length}</p>
          <ArrowDownIcon className=" h-8 p-1 text-gray-400 border hover:text-blue-500 rounded-md" />
        </div>
        {/* <hr className="h-auto w-[1px] bg-gray-200 "/> */}
        <div className="w-full flex-1 ">
          {/* HEader */}
          <div className="flex p-2 space-x-2 items-center w-auto">
            <Avatar seed={`${post.username}`} />
            <Link href={`/subreddit/${post.subreddit[0].topic}`}>
              <p className="font-bold text-gray-800">{`r/${post.subreddit[0].topic}`}</p>
            </Link>
            <p className="font-semibold  text-gray-400">
              {`Posted by u/${post.username} `}
              <TimeAgo date={post.created_at} />
            </p>
          </div>
          {/* Body */}
          <div className="p-2 space-y-2 w-auto">
            <p className="font-bold text-2xl">{`${post.title}`}</p>
            <p className="text-gray-700 font-medium">{`${post.body}`} </p>
          </div>
          {/* Image */}
          <div className="flex relative  w-full">
            {/* <Image
            // height={}
            objectFit="contain"
            src={tn3}
            // layout="fill"
            alt={""}
            className="object-cover h-[15rem]"
          /> */}
          </div>

          {/* Footer */}
          <div className="flex p-2 justify-between border-t flex-1 items-center space-x-4  w-auto">
            <div className="flex hover:bg-slate-200 rounded-md items-center p-1 ">
              <ChatAltIcon className="w-8 h-8  hover:text-white  p-1 rounded-md  text-gray-400" />
              <p className=" text-black  font-bold">
                {post.comments.length}
                <span className="hidden text-gray-400 font-normal sm:inline">{` Comments`}</span>{" "}
              </p>
            </div>
            <div className="flex hover:bg-slate-200 rounded-md items-center p-1">
              <GiftIcon className="w-8 h-8  hover:text-white rounded-md p-1 text-gray-400" />
              <p className="text-gray-400 hidden sm:block ">{`Award`} </p>
            </div>

            <div className="flex items-center hover:bg-slate-200 rounded-md cursor-pointer  p-1">
              <ShareIcon className="w-8 h-8 p-1 rounded-md  hover:text-white  text-gray-400" />
              <p className="text-gray-400 hidden sm:block">{`Share`} </p>
            </div>
            <div className="flex hover:bg-slate-200 rounded-md cursor-pointer items-center p-1">
              <BookmarkIcon className="w-8 h-8 p-1 rounded-md hover:text-white text-gray-400" />
              <p className="text-gray-400 hidden sm:block">{`Save`} </p>
            </div>
            <DotsHorizontalIcon className="w-10 cursor-pointer  h-8 p-1 rounded-md hover:bg-slate-300 hover:text-white text-gray-400 " />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
