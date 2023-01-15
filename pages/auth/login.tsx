import React, { useState } from "react";
import Image from "next/image";
import { github, google, loginsideimage, LogoMark } from "../../assets";
import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

function login({ csrfToken } :{csrfToken:any}) {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.replace("http://localhost:3000/");
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (formData) => {
    console.log("formData:",formData);
    // const data = {
    //   email: formData.email,
    //   csrfToken: csrfToken,
    // }
    // const JSONdata = JSON.stringify(data);
    // const endpoint = '/api/auth/signin/email'
    // console.log(JSONdata);
    
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSONdata,
    // }

    // const response = await fetch(endpoint,options)
    // console.log(response.url);
    // router.push(response.url);
    signIn("email",{email:formData.email,redirect:false});
  });

  return (
    <>
      <section className="max-w-5xl my-auto mx-auto">
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="hidden lg:block md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>
            <div className="sm:w-10/12 md:w-8/12 lg:w-5/12 lg:ml-20">
              <form onSubmit={onSubmit}>
                {/* <!-- Email input --> */}
                <div className="mb-6">
                  <input
                    {...register("email")}
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                  />
                </div>

                {/* <!-- Password input --> */}
                <div className="mb-6">
                  <input
                    {...register("password")}
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                    autoComplete="true"
                  />
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck3"
                      //   checked
                    />
                    <label
                      className="form-check-label inline-block text-gray-800"
                      htmlFor="exampleCheck3"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#!"
                    className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* <!-- Submit button --> */}
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Sign in
                </button>

                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">OR</p>
                </div>

                <a
                  onClick={() =>
                    signIn("reddit", { callbackUrl: "http://localhost:3000/" })
                  }
                  className=" px-7 py-1 mb-3 border text-[#FF4500] hover:bg-[#FF4500] border-[#FF4500] hover:text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
                  // style={{backgroundColor: "#55acee"}}
                  href="#!"
                  role="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  {/* <!-- Twitter --> */}
                  <div className="relative overflow-hidden h-12 w-12 mr-2">
                    <Image src={LogoMark} alt={""} objectFit="contain" />
                  </div>
                  Continue with REDDIT
                </a>
                <a
                  onClick={() =>
                    signIn("github", { callbackUrl: "http://localhost:3000/" })
                  }
                  className="px-7 py-3 text-[#373535] border border-[#373535] hover:bg-[#373535] hover:text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                  // style={{backgroundColor: "#3b5998"}}
                  href="#!"
                  role="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  {/* <!-- Facebook --> */}
                  <div className="h-8 w-8 mr-2">
                    <Image src={github} alt={""} />
                  </div>
                  Continue with GITHUB
                </a>
                <a
                  onClick={() =>
                    signIn("google", { callbackUrl: "http://localhost:3000/" })
                  }
                  className="px-7 py-3 border text-[#55acee] hover:bg-[#55acee] border-[#55acee] hover:text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
                  // style={{backgroundColor: "#55acee"}}
                  href="#!"
                  role="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  {/* <!-- Twitter --> */}
                  <div className="relative h-8 w-8 mr-2">
                    <Image src={google} alt={""} objectFit="contain" />
                  </div>
                  Continue with GOOGLE
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  }
}

export default login;
