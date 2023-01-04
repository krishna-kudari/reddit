import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Post from "../../components/Post";
import { GET_POST_BY_POST_ID } from "../../graphql/queries";
import { SubmitHandler, useForm } from "react-hook-form";
import { ADD_COMMENT } from "../../graphql/mutations";
import { toast } from "react-hot-toast";

type FormData = {
  comment : string;
}

function PostPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // console.log(router.query.postId);
  const postId = router.query.postId;
  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: { post_id: postId },
  });
  const post: Post = data?.getPostByPostId;

  const {register , handleSubmit , watch , formState : {errors } , setValue} = useForm();
  const[addComment] = useMutation(ADD_COMMENT,{
    refetchQueries:[GET_POST_BY_POST_ID,'getPostListByPostId'],
  });
  const onSubmit = handleSubmit(async (FormData) => {
    // console.log(FormData);
    const notofication = toast.loading("comment posting")
    try {
      const {data : { insertComment : newComment }} = await addComment({
        variables: {post_id : postId , username:session?.user?.name , text:FormData.comment}
      });
      // console.log(newComment);
      setValue("comment" , "");
      toast.success("comment posted",{
        id: notofication
      })
    } catch (error) {
      toast.error("Whoops something went wrong",{
        id: notofication,
      })
    }
  })

  console.log(post);
  
  return (
    <div className="mx-auto my-7  max-w-5xl">
      <Post post={post} />

      <div className=" -mt-2 shadow-sm relative  z-10 w-full p-5 bg-white border border-gray-100  pl-16 border-t-0 rounded-b-md">
        <p className="text-sm">
          Comment as <span className="text-red-500">{session?.user?.name}</span>
        </p>

        <form onSubmit={onSubmit} className="flex flex-col space-y-2">
            <textarea {...register("comment",{required:true})} disabled={!session} className="h-12  rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50" placeholder={session ? 'What are your thoughts' : "Please Sign in to Comment"}/>
            {Object.keys(errors).length > 0 && (
              <div className="space-y-2 p-2 text-red-500">
                <p>-Please comment to Post</p>
              </div>
            )}
            {!!watch("comment") && (
              <button className="bg-red-500 rounded-full p-3 font-semibold text-white disabled:bg-gray-200" type="submit">Comment</button>
            )}
        </form>
      </div>
    </div>
  );
}

export default PostPage;
