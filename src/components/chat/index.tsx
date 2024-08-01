'use client';

import { useAppSelector } from '@/redux/hooks';
import EmailInput from './EmailInput';
import ChatRoom from './ChatRoom';
import { IUser } from '@/types';

export default function ChatPage() {
  const user = useAppSelector((state) => state.user.one);
  const chatRoom = useAppSelector((state) => state.chatRoom.one);

  return !user || !chatRoom ? (
    <EmailInput />
  ) : (
    <ChatRoom currentUser={user as IUser} />
  );
}
