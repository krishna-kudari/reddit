import { useQuery } from "@apollo/client";
import React from "react";
import {
  GET_ALL_POSTS,
  GET_POSTS_BY_TOPIC,
  GET_SUBREDDIT_BY_TOPIC,
} from "../graphql/queries";
import Post from "./Post";

type Props = {
  topic?: string;
};
function Feed({ topic }: Props) {
  const { data, error } = !topic? useQuery(GET_ALL_POSTS)
    : useQuery(GET_POSTS_BY_TOPIC, {
        variables: { topic: topic },
      });
  const posts: Post[] = !topic ? data?.getPostList : data?.getPostListByTopic;
  console.log(posts);
  return (
    <div className="w-auto">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Feed;
