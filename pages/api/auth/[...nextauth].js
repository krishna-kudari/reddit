import nextAuth from "next-auth";
import RedditProvider from 'next-auth/providers/reddit'
// require('dotenv-flow').config();
// console.log(process.env);

export default nextAuth({
    //configure onr or more authentication providers
    providers:[
        RedditProvider({
            clientId : process.env.CLIENT_REDDIT_ID || "nm90KirvIAd8CL3xz9qu-A",
            clientSecret: process.env.CLIENT_REDDIT_SECRET || "6duppSDzT1rjehXiJuBsObATvuHiIA",
        }),
        
    ]
})