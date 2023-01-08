import Image from "next/image";
import React, { useState } from "react";
import { Logo, LogoType, LogoMark, Avatar, Avatar2 } from "../assets";
import {
  ChevronDownIcon,
  HomeIcon,
  SearchIcon,
  MenuIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";
import {
  SparklesIcon,
  GlobeIcon,
  VideoCameraIcon,
  ChatIcon,
  BellIcon,
  PlusIcon,
  SpeakerphoneIcon,
  LogoutIcon,
  BookmarkIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Header() {
  const { data: session, status } = useSession();
  const [dropdopen, setDropdopen] = useState(false);
  return (
    <div className="shadow-sm  flex sticky top-0 z-50  bg-white px-4 py-2">
      <div className="hidden sm:block relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Link href="/">
          <Image
            src={Logo}
            alt={""}
            layout="fill"
            objectFit="contain"
            className="object-contain"
          />
        </Link>
      </div>
      <div className=" relative sm:hidden h-10 w-10 flex-shrink-0 cursor-pointer">
        <Link href={"/"}>
          <Image src={LogoMark} alt={""} className="object-contain" />
        </Link>
      </div>

      <div className="flex mx-7 items-center xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="hidden ml-2 flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      {/* Search box */}
      <form className="flex flex-1 items-center space-x-2 bg-gray-100 border-gray-200 px-3 py-1 border-2 rounded-sm">
        <SearchIcon className="h-5 w-5 shrink-0 text-gray-400 mr-2" />
        <input
          type="text"
          className="flex-1 bg-transparent outline-none"
          placeholder="Search Reddit"
        />
        <button type="submit" hidden></button>
      </form>

      <div className="mx-5 items-center text-gray-500 hidden lg:inline-flex space-x-2">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>

      <div
        onClick={() => setDropdopen(!dropdopen)}
        className="ml-5 items-center flex justify-center lg:hidden w-10 rounded-full duration-500 hover:border-1 hover:border-gray-300 hover:bg-slate-500"
      >
        <MenuIcon className="icon" />
      </div>

      {/* Sign in Signout button */}
      {session ? (
        <div
          onClick={() => {
            setDropdopen(!dropdopen);
          }}
          className="lg:flex items-center border rounded-sm hover:border-gray-200 duration-500 border-gray-100 px-2 cursor-pointer space-x-2 hidden"
        >
          <div>
            {
              dropdopen ? (<ChevronUpIcon className="flex-1 h-5 w-5"/>) : (<ChevronDownIcon className="flex-1 h-5 w-5" />)
            }
          </div>
          <div className="relative w-3/12 h-full flex-shrink-0 text-gray-500">
            <Image
              src={Avatar2}
              objectFit="contain"
              layout="fill"
              // height={}
              // width={50}
              alt={""}
              className=""
            />
          </div>
          <div className="flex-1 text-xs">
            <p className="truncate">{session?.user?.name}</p>
            <p className="text-gray-400 truncate">1 Karma</p>
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            signIn();
          }}
          className="lg:flex items-center cursor-pointer space-x-2 hidden"
        >
          <div className=" h-8 w-8 ml-5 flex items-center flex-shrink-0 justify-center rounded-full bg-gray-200 text-gray-500">
            <Image src={Avatar} alt={""} className="object-contain" />
          </div>
          <p className="text-gray-800">Sign in</p>
        </div>
      )}

      {dropdopen && (
        <div className="top-12 flex lg:flex flex-col shadow-sm absolute min-w-[8rem] right-0 z-20 bg-white border-x rounded-b ">
          <Link href={`/profile/${session?.user?.name}`}>
          <div className="flex space-x-2 p-2 items-center  cursor-pointer border-b">
            <BookmarkIcon className="h-5 w-5 flex-shrink-0" />
            <p className="text-center">Profile</p>
          </div>
          </Link>
          <div onClick={()=> signOut()} className=" flex space-x-2 p-2 items-center border-b cursor-pointer">
            <LogoutIcon className="h-5 w-5 flex-shrink-0"/>
            <p className="text-center text-gray-600">logout</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
