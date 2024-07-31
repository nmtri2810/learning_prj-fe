'use client';

import { getList } from '@/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useAppDispatch();

  const userList = useAppSelector((state) => state.user.list);

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  return (
    <>
      <h1>User page</h1>
      <div>List user email: </div>
      <ul className='ml-6 list-disc'>
        {userList?.map((user) => <li key={user.id}>{user.email}</li>)}
      </ul>
    </>
  );
}
