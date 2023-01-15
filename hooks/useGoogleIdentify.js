import { useEffect, useState } from "react"
import {useSession, signIn} from 'next-auth/react';
// require('dotenv').config();

const useGoogleIdentify = (props) =>{

    const url = 'https://accounts.google.com/gsi/client'
    const {data: session} = useSession();
    const [isLoading , setIsLoading] = useState();
    const [isSignedIn, setIsSignedIn] = useState();
    const {nextAuthOpt , googleOpt} = props || {}

    useEffect(()=> {
        if(session){
            setIsSignedIn(true)
        }
    },[session])

    useEffect(()=>{
        // add Google identify script
        let script = document.createElement('script');
        script.src = url
        script.async = true
        document.head.appendChild(script)

        //initialize Google
        if(!isLoading && !isSignedIn){
            const {google} = window 
            if(google){
                google.accounts.id.initialize({
                    client_id: "446554177186-ne1uv1u6nvksd08rf3fq2sblk8g3ae5d.apps.googleusercontent.com",
                    callback: async (response) => {
                        setIsLoading(true)
                        //call provider with the token provided by google
                        await signIn('myRedditClone',{
                            credential: response.credential,
                            ...nextAuthOpt
                        })

                        setIsLoading(false)
                    },
                    ...googleOpt

                })

                // prompt one tap

                if(googleOpt.isOneTap){
                    google.accounts.id.prompt((notification) => {
                        if(notification.isNotDisplayed()){
                            console.log('getNotDisplayedReason: ', notification.getNotDisplayedReason())
                        }else if(notification.isSkippedMoment()){
                            console.log('isSkippedMoment: ', notification.getSkippedReason());
                        }else if(notification.isDismissedMoment()){
                            console.log('isDismissedMoment: ', notification.getDismissedReason());
                        }
                    })
                }
            }
        }
    },[googleOpt,isLoading,isSignedIn,nextAuthOpt])

    return {isLoading , isSignedIn}
}

export default useGoogleIdentify;