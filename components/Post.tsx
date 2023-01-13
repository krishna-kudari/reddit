import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
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
import { Avatar2, reddit_banner, tn1, tn2, tn3, youbrokeit2 } from "../assets";
import TimeAgo from "react-timeago";
import Link from "next/link";

import { Jelly } from "@uiball/loaders";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";
import { GET_VOTES_BY_POST_ID } from "../graphql/queries";
import { ADD_VOTE, DELETE_VOTE } from "../graphql/mutations";
import { supabase } from "../supabaseClient";

type Props = {
  post: Post;
};

function Post({ post }: Props) {
  const { data: session } = useSession();
  const [vote, setVote] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState('');

  const { data, loading } = useQuery(GET_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  });

  // console.log(data);
  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from('images').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setImageUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }
  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_VOTES_BY_POST_ID, "getVoteListByPostId"],
  });
  const [deleteVote] = useMutation(DELETE_VOTE);
  const upVote = async (isUpvote: boolean) => {
    console.log(vote);

    if (!session) {
      toast("! You'll need to sign in to Vote!");
      return;
    }

    if (vote && isUpvote) {
      return;
    }
    if (vote === false && !isUpvote) return;

    const {data : {deleteVote: oldVote}} = await deleteVote({
      variables:{
        post_id: post.id,
        username: session?.user?.name
      }
    })

    const {
      data: { insertVote: newVote },
    } = await addVote({
      variables: {
        post_id: post.id,
        username: session?.user?.name,
        upvote: isUpvote,
      },
    });

    // setVote(newVote.upvote);
  };

  useEffect(() => {
    const votes: Vote[] = data?.getVoteListByPostId;
    const dbvote = votes?.find(
      (vote) => vote.username == session?.user?.name
    )?.upvote;
    // console.log(vote);
    // console.log(dbvote);
    setVote(dbvote as boolean);
    if(post?.image)downloadImage(`${post?.image}`);
    // console.log(vote);
  }, [data]);

  function cntvotes() {
    let tot = 0;
    post?.votes?.forEach(v => {
      if(v.upvote)tot++;
      else tot--;
    });
    return tot;
  }

  if (!post)
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} speed={0.6} color="#FF4501" />
      </div>
    );
  if(post.image && !imageUrl){
    return <div></div>
  }
  return (
    
    <div className="flex mx-auto drop-shadow-md w-auto rounded-lg  h-auto bg-white mt-5">
      <div className=" p-2 ">
        <ArrowUpIcon
          onClick={() => upVote(true)}
          className={`h-8 p-1  border hover:text-red-500 ${
            vote ? "text-red-500" : "text-gray-400"
          }  rounded-md`}
        />
        <p className="text-center font-bold">{cntvotes()}</p>
        <ArrowDownIcon
          onClick={() => upVote(false)}
          className={`h-8 p-1  border hover:text-blue-500 ${
            vote === false ? "text-blue-500" : "text-gray-400"
          } rounded-md`}
        />
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
        <Link href={`/post/${post.id}`}>
          {/* Body */}
          <div className="p-2 space-y-2 w-auto">
            <p className="font-bold text-2xl">{`${post.title}`}</p>
            <p className="text-gray-700 font-medium">{`${post.body}`} </p>
          </div>
          {/* Image */}
          <div className="flex  justify-center  w-full">
           {imageUrl && (
            <img src={imageUrl} className=""  alt="" placeholder="image" />
            // <Image
            //   objectFit="contain"
            //   src={imageUrl}
            //   layout="fill"
            //   // width={500}
            //   // height={600}
            //   alt={""}
            //   className="mx-auto"
            // />
           )} 
          </div>
        </Link>
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

  );
}

export default Post;
