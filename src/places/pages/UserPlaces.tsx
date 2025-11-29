import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

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
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { userId } = useParams<RouteParams>();

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const responseData = await sendRequest(
          `http://localhost:5001/api/places/user/${userId}`
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
        : []
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />

      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
      )}
    </>
  );
}

export default UserPlaces;
