import { useRouter } from 'next/router';
import React from 'react'
import Feed from '../../components/Feed';
import UserCard from '../../components/UserCard';

function Profile() {
  const router = useRouter();
  const username = router.query.username;
  return (
    <div className='flex'>
        <Feed username={`${username}`}/>
        <div className='hidden xl:block sticky top-20 h-fit w-2/5'>
            <UserCard />
        </div>
    </div>
  )
}

export default Profile