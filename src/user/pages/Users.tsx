import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

type User = {
  id: string;
  name: string;
  image: string;
  places: { id: string }[];
};

function Users() {
  const [loadedUsers, setLoadedUsers] = useState<User[] | undefined>();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const responseData = await sendRequest(
          'http://localhost:5001/api/users'
        );
        setLoadedUsers(responseData.users as User[]);
      } catch (error) {}
    }

    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />

      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
}

export default Users;
