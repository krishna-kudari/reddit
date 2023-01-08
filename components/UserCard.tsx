import Image from "next/image";
import React from "react";
import { Avatar2, reddit_banner } from "../assets";
import { CakeIcon, SparklesIcon } from "@heroicons/react/solid";
import { PlusIcon } from "@heroicons/react/outline";
function UserCard() {
  return (
    <div className="overflow-hidden relative rounded m-auto max-w-sm bg-white ">
      {/* //backgroud banner */}
      <div className="h-24 w-full absolute top-0 left-0  bg-orange-500">
        <Image objectFit="cover" fill src={reddit_banner} alt={""}/>
      </div>
      {/* Profile image Avatar */}
      <div className="relative pt-5">
        <Image src={Avatar2} className="mx-auto object-contain" alt={""}/>
      </div>
      
      <p className="text-2xl text-center font-semibold">KRISH-I</p>
      <p className="text-md text-center text-gray-500">u/KRISH_I . 9d</p>
      {/* karma & cakeDay */}
      <div className="flex">
        <div className="w-1/2 p-2">
            <p className="">Karma</p>
            <div className="flex items-center">
                <SparklesIcon className="h-3 w-3 flex-shrink-0"/>
                <span>{1}</span>
            </div>
        </div>
        <div className="w-1/2 p-2 ">
            <p className="">Cake Day</p>
            <div className="flex items-center">
                <CakeIcon className="h-3 w-3 flex-shrink-0"/>
                <span>{1}</span>
            </div>
        </div>
      </div>
      {/* social links */}
      <div className="flex flex-col">
        <div className="flex border-y items-center p-2">
            <p>Kkrishna22572@gmail.com</p>
        </div>
        <div className="flex border-b items-center p-2">
            <p>linkedin-5726153</p>
        </div>
        <div className="flex border-b items-center p-2">
            <p>leetcode-Kkrishna22572</p>
        </div>
        <div className="flex  items-center flex-row-reverse p-2">
            <div className="p-2 rounded-full bg-gray-200">
                <PlusIcon className="w-6 h-6 "/>
            </div>
            <p className="px-2">add socialLinks</p>
        </div>
      </div>

    </div>
  );
}

export default UserCard;
