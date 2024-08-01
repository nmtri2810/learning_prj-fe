import { getChatRoom } from '@/redux/features/chatRoomSlice';
import { getUser } from '@/redux/features/userSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useState } from 'react';

export default function EmailInput() {
  const [userIdInput, setUserIdInput] = useState<string>('');
  const [chatIdInput, setChatIdInput] = useState<string>('');

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (
      userIdInput.trim() === '' ||
      chatIdInput.trim() === '' ||
      isNaN(Number(userIdInput)) ||
      isNaN(Number(chatIdInput))
    ) {
      alert('Error');
      return;
    }

    dispatch(getUser(userIdInput.trim()));
    dispatch(getChatRoom(chatIdInput.trim()));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <h1>Enter data to join chat room</h1>
      <div className='mt-2 flex w-fit flex-col gap-2'>
        <input
          placeholder='Enter user id'
          value={userIdInput}
          onChange={(e) => setUserIdInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          placeholder='Enter chat id'
          value={chatIdInput}
          onChange={(e) => setChatIdInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}
