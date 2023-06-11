import { closeAllChats } from '@/redux/features/openedChatsSlice';
import { useGetLoggedUserQuery, useGetUserChatsQuery } from '@/redux/services/loggedUserAPI';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function useChangeLoggedUser(userId?: string) {
  const dispatch = useDispatch();

  const { refetch: refetchLoggedUser } = useGetLoggedUserQuery({});
  const { refetch: refetchChats } = useGetUserChatsQuery({});
  const [isLoading, setIsLoading] = useState(false);

  async function switchLoggedUser() {
    setIsLoading(true);

    dispatch(closeAllChats());

    if (userId) localStorage.setItem('loggedUser', JSON.stringify(userId));
    // Redux logged user query handles random user fetching if no userId is stored in localStorage
    else localStorage.removeItem('loggedUser');

    //! Keep it synchronous, cause one depends on the other
    await refetchLoggedUser();
    await refetchChats();

    setIsLoading(false);
  }

  return { switchLoggedUser, isLoading };
}
