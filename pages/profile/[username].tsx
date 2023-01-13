import { useRouter } from 'next/router';
import React from 'react'
import Feed from '../../components/Feed';
import UserCard from '../../components/UserCard';

function Profile() {
  const router = useRouter();
  const username = router.query.username;
  return (
    <div className='flex'>
      <div className='max-w-3xl mx-auto'>
        <Feed username={`${username}`}/>
      </div>
      <div className='hidden xl:block sticky top-20 h-fit w-1/3'>
          <UserCard />
      </div>
    </div>
  )
}

export default Profile