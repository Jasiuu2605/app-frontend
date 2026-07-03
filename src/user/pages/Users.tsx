import React, { useEffect, useState } from 'react';

import { API_BASE_URL } from '../../shared/util/config';

import UsersList from '../components/UsersList/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './Users.css';

type User = {
  id: string;
  name: string;
  image: string;
  places: { id: string }[];
};

function Users() {
  const [loadedUsers, setLoadedUsers] = useState<User[] | undefined>();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'places'>('name');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const responseData = await sendRequest(`${API_BASE_URL}/api/users`);
        setLoadedUsers(responseData.users as User[]);
      } catch (error) {}
    }

    fetchUsers();
  }, [sendRequest]);

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const visibleUsers = loadedUsers
    ?.filter((user) => user.name.toLowerCase().includes(normalizedSearchTerm))
    .sort((firstUser, secondUser) => {
      if (sortBy === 'places') {
        return secondUser.places.length - firstUser.places.length;
      }

      return firstUser.name.localeCompare(secondUser.name);
    });

  let content: React.ReactNode = null;

  if (isLoading) {
    content = (
      <div className='center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!isLoading && loadedUsers) {
    content = (
      <>
        <section className='users-toolbar'>
          <input
            type='search'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder='Search users...'
            aria-label='Search users'
          />
          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as 'name' | 'places')
            }
            aria-label='Sort users'
          >
            <option value='name'>Name A-Z</option>
            <option value='places'>Most places</option>
          </select>
          <p className='users-toolbar__count'>
            {visibleUsers?.length || 0}{' '}
            {visibleUsers?.length === 1 ? 'user' : 'users'} found
          </p>
        </section>

        {visibleUsers && visibleUsers.length > 0 ? (
          <UsersList items={visibleUsers} />
        ) : (
          <div className='center'>
            <h2>No users match your search.</h2>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {content}
    </>
  );
}

export default Users;
