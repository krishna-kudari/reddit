import { useQuery } from "@apollo/client";
import React from "react";
import {
  GET_ALL_POSTS,
  GET_POSTS_BY_TOPIC,
  GET_POSTS_BY_USERNAME,
  GET_SUBREDDIT_BY_TOPIC,
} from "../graphql/queries";
import Post from "./Post";

type Props = {
  topic?: string;
  username?: string;
};
function Feed({ topic , username }: Props) {
  const { data, error } = !topic? !username ?useQuery(GET_ALL_POSTS) : useQuery(GET_POSTS_BY_USERNAME, {
    variables: { username: username }
  }): useQuery(GET_POSTS_BY_TOPIC, {
        variables: { topic: topic },
      });
  const posts: Post[] = !topic ? !username ? data?.getPostList : data?.getPostListByUserName : data?.getPostListByTopic;
  console.log("posts:",posts);
  return (
    <div className="w-full">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Feed;
