import { createClient } from '@supabase/supabase-js'
// import { unstable_getServerSession , useSession} from 'next-auth/react';
// const {data: session} = useSession();
// const {supabaseAccessToken } = session;
export const supabase = createClient('https://ysnbedbxbdnfkbhtmilv.supabase.co', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzbmJlZGJ4YmRuZmtiaHRtaWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI1NTIwMTEsImV4cCI6MTk4ODEyODAxMX0.b1k4aWKlGZnyxdGNs7KnOoG__lI6jBZWrmK5mDoHtPo`,
    // {
    //     global: {
    //         headers: {
    //             Authorization: `Bearer ${supabaseAccessToken}`,
    //         },
    //     },
    // }
)

// Now you can query with RLS enabled.
// const { data, error } = await supabase.from("users").select("*")