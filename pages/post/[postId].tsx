import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Post from "../../components/Post";
import { GET_POST_BY_POST_ID } from "../../graphql/queries";
import { SubmitHandler, useForm } from "react-hook-form";
import { ADD_COMMENT } from "../../graphql/mutations";
import { toast } from "react-hot-toast";
import Avatar from "../../components/Avatar";
import TimeAgo from "react-timeago";

type FormData = {
  text: string;
};

// type Comment = {
//   created_at: string;
//   id: number;
//   post_id: number;
//   text: string;
//   username: string;
// };

function PostPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // console.log(router.query.postId);
  const postId = router.query.postId;
  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: { post_id: postId },
  });
  const post: Post = data?.getPostByPostId;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, "getPostListByPostId"],
  });
  const onSubmit = handleSubmit(async (FormData) => {
    // console.log(FormData);
    const notofication = toast.loading("comment posting");
    try {
      const {
        data: { insertComment: newComment },
      } = await addComment({
        variables: {
          post_id: postId,
          username: session?.user?.name,
          text: FormData.text,
        },
      });
      // console.log(newComment);
      setValue("text", "");
      toast.success("comment posted", {
        id: notofication,
      });
    } catch (error) {
      toast.error("Whoops something went wrong", {
        id: notofication,
      });
    }
  });

  return (
    <div className="mx-auto my-7  max-w-5xl">
      <Post post={post} />

      {!!post && (
        <div className=" -mt-2 shadow-sm relative  z-10 w-full p-5 bg-white border border-gray-100  pl-16  border-y-0 rounded-b-md">
          <p className="text-sm">
            Comment as{" "}
            <span className="text-red-500">{session?.user?.name}</span>
          </p>

          <form onSubmit={onSubmit} className="flex flex-col space-y-2">
            <textarea
              {...register("text", { required: true })}
              disabled={!session}
              className="h-12  rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
              placeholder={
                session ? "What are your thoughts" : "Please Sign in to Comment"
              }
            />
            {Object.keys(errors).length > 0 && (
              <div className="space-y-2 p-2 text-red-500">
                <p>-Please comment to Post</p>
              </div>
            )}
            {!!watch("text") && (
              <button
                className="bg-red-500 rounded-full p-3 font-semibold text-white disabled:bg-gray-200"
                type="submit"
              >
                Comment
              </button>
            )}
          </form>
        </div>
      )}

      {!!post && (
        <div className="rounded-b-md z-50 shadow-sm overflow-hidden relative -my-5 border-t-0 border-gray-300 bg-white py-5 pl-10">
          <hr className="py-2 w-full" />

          {post.comments.map((comment : Comments) => (

            <div key={comment.id} className="relative flex items-center space-x-2 space-y-5">
            <hr className="h-16 absolute top-10 left-7  border-l border-gray-300"/>
              <div className="z-50">
                <Avatar seed={`${comment.username}`} />
              </div>

              <div className="flex flex-col">
                <p className="py-2 text-xs text-gray-400">
                  <span className="font-semibold text-gray-600">{comment.username}</span>{' • '}
                  <TimeAgo date={comment.created_at}/>
                </p>
                <p>{comment.text}</p>
              </div>
            </div>
          )
          )}
        </div>
      )}
    </div>
  );
}

export default PostPage;
