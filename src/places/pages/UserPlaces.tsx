import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { API_BASE_URL } from '../../shared/util/config';

import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import './UserPlaces.css';

type Coordinates = {
  lat: number;
  lng: number;
};

type Place = {
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creator: string;
  location: Coordinates;
};

type RouteParams = {
  userId: string;
};

function UserPlaces() {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[] | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'address'>('title');
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { userId } = useParams<RouteParams>();

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const responseData = await sendRequest(
          `${API_BASE_URL}/api/places/user/${userId}`,
        );
        setLoadedPlaces(responseData.places as Place[]);
      } catch (error) {}
    }

    fetchPlaces();
  }, [sendRequest, userId]);

  function placeDeletedHandler(deletedPlaceId: string) {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces
        ? prevPlaces.filter((place) => place.id !== deletedPlaceId)
        : [],
    );
  }

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const visiblePlaces = loadedPlaces
    ?.filter((place) => {
      const searchableText = `${place.title} ${place.address} ${place.description}`;
      return searchableText.toLowerCase().includes(normalizedSearchTerm);
    })
    .sort((firstPlace, secondPlace) => {
      if (sortBy === 'address') {
        return firstPlace.address.localeCompare(secondPlace.address);
      }

      return firstPlace.title.localeCompare(secondPlace.title);
    });

  let content: React.ReactNode = null;

  if (isLoading) {
    content = (
      <div className='center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!isLoading && loadedPlaces) {
    content = (
      <>
        <section className='places-toolbar'>
          <input
            type='search'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder='Search places...'
            aria-label='Search places'
          />

          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as 'title' | 'address')
            }
            aria-label='Sort places'
          >
            <option value='title'>Title A-Z</option>
            <option value='address'>Address A-Z</option>
          </select>

          <p className='places-toolbar__count'>
            {visiblePlaces?.length || 0}{' '}
            {visiblePlaces?.length === 1 ? 'place' : 'places'} found
          </p>
        </section>

        {visiblePlaces && visiblePlaces.length > 0 ? (
          <PlaceList
            items={visiblePlaces}
            onDeletePlace={placeDeletedHandler}
          />
        ) : (
          <div className='center'>
            <h2>No places match your search.</h2>
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

export default UserPlaces;
