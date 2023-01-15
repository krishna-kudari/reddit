import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Header from "../components/Header";
import GoogleOneTapLogin from "react-google-one-tap-login";
import { gql, ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import PostBox from "../components/PostBox";
import { Toaster } from "react-hot-toast";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
// require('dotenv').config();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Toaster />
        {/* <GoogleOneTapLogin onError={(error) => console.log(error)} onSuccess={(response) => console.log(response)} googleAccountConfigs={{ client_id: "446554177186-ne1uv1u6nvksd08rf3fq2sblk8g3ae5d.apps.googleusercontent.com"}} /> */}
        <div className="h-screen overflow-y-scroll bg-slate-200">
          <Header />
          {/* <PostBox /> */}
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
