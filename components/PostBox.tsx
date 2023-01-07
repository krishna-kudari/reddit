import { useMutation } from "@apollo/client";
import { LinkIcon, PhotographIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import client from "../apollo-client";
import { ADD_POST, ADD_SUBREDDIT } from "../graphql/mutations";
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from "../graphql/queries";
import Avatar from "./Avatar";
import {supabase } from '../supabaseClient';
import {uid} from 'uid';

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: object;
  subreddit: string;
};

type Props = {
  subreddit?: string;
};

export default function PostBox({ subreddit }: Props) {

  const [uploading, setUploading] = useState(false);
  const [imageBoxOpen, setImageBoxOpen] = useState(false);
  const { data: session, status } = useSession();
  
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS, "getPostList"],
  });
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true);

      if(!event.target.files || event.target.files.length === 0){
        return toast.error("you must select and image to upload");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${uid()}.${fileExt}`;
      const filePath = `${fileName}`;
      let notification = toast.loading("uploading...");
      let {error: uploadError } = await supabase.storage.from('images').upload(filePath , file , {upsert: true})

      if(uploadError){
        return toast.error("Whoops something went wrong",{
          id: notification,
        })
      }
      // onUpload(filePath);
      setValue("postImage",filePath);
      toast.success("Uploaded",{
        id: notification,
      })
    } catch (error) {
      alert('Error uploading image');
      console.log(error);
    }
    finally {
      setUploading(false);
    }
  }

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
    const notification = toast.loading("Creating new post...");
    try {
      // Query for subreddit topic
      console.log("before");

      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: subreddit || formData.subreddit,
        },
      });
      console.log("subreddit query executed");

      const subredditExists = getSubredditListByTopic.length > 0;

      if (!subredditExists) {
        //create subreddit
        console.log("Creating new subreddit");

        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        });

        console.log("creating post..", formData);
        const image = formData.postImage || ""

        console.log(image);
        
        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: newSubreddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });

        console.log("New Post added", newPost);
      } else {
        // use existing subreddit
        console.log("Using existing subreddit");
        console.log(getSubredditListByTopic);

        
        const image = formData.postImage || "";
        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: getSubredditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });
        console.log("New Post added", newPost);
      }
      //After the post has added
      setValue("postBody", "");
      setValue("postImage", "");
      setValue("postTitle", "");
      setValue("subreddit", "");

      toast.success("New Post created", {
        id: notification,
      });
    } catch (error) {
      toast.error("Whoops something went wrong", {
        id: notification,
      });
    }
  });


  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-24 z-50 bg-white
     border-gray-300 p-2 rounded-sm"
    >
      <div className="flex items-center space-x-3 ">
        {/* Avatar */}
        <Avatar seed="_" />
        <input
          {...register("postTitle", { required: true })}
          disabled={!session}
          className="bg-gray-100 rounded-md flex-1 p-2 pl-5 outline-none"
          type="text"
          placeholder={
            session
              ? subreddit
                ? "Create a post in subreddit"
                : "Create a post by entering a title"
              : "Sing in to post"
          }
        />
        <label htmlFor="file-input">
          <PhotographIcon
            onClick={() => setImageBoxOpen(!imageBoxOpen)}
            className={`h-6 cursor-pointer text-gray-300 ${
              imageBoxOpen && "text-blue-300"
            }`}
          />
          <input
            className="hidden"
            type="file"
            id="file-input"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
            title="upload image"
            placeholder="upload"
          />
        </label>
        
        <LinkIcon className={`h-6 text-gray-300`} />
      </div>

      {!!watch("postTitle") && (
        <div className="flex flex-col py-2">
          {/* body */}
          <div className="flex items-center px-2">
            <p className="min-w-[90px]:">Body:</p>
            <input
              {...register("postBody")}
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              type={"text"}
              placeholder="Text (optional)"
            />
          </div>

          {!subreddit && (
            <div className="flex items-center px-2">
              <p className=" min-w-[90px]:">Subreddit:</p>
              <input
                {...register("subreddit", { required: true })}
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                type={"text"}
                placeholder="i.e. reactjs"
              />
            </div>
          )}

          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className=" min-w-[90px]:">Image URL:</p>
              <input
                {...register("postImage")}
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                type={"text"}
                placeholder="Optional..."
              />
            </div>
          )}

          {/* Errors */}

          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type == "required" && (
                <p>-A Post Title is required</p>
              )}
              {errors.subreddit?.type == "required" && (
                <p>-A Subreddit is required</p>
              )}
              
            </div>
          )}

          {!!watch("postTitle") && (
            <button
              type="submit"
              className="bg-blue-400 p-2 text-white rounded-full w-full"
            >
              Create post
            </button>
          )}
        </div>
      )}
    </form>
  );
}
