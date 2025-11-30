import React, { useEffect, useState, useContext, FormEvent } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import './PlaceForm.css';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';

type RouteParams = {
  placeId: string;
};

type LoadedPlace = {
  title: string;
  description: string;
};

function UpdatePlace() {
  const { placeId } = useParams<RouteParams>();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState<LoadedPlace | undefined>();
  const history = useHistory();
  const auth = useContext(AuthContext) as any;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    async function fetchPlace() {
      try {
        const responseData = await sendRequest(
          `http://localhost:5001/api/places/${placeId}`
        );

        setLoadedPlace({
          title: responseData.place.title,
          description: responseData.place.description,
        });

        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    }

    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  async function placeUpdateSubmitHandler(event: FormEvent) {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5001/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      history.push('/' + auth.userId + '/places');
    } catch (error) {}
  }

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />

      {!isLoading && loadedPlace && (
        <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title'
            onInput={inputHandler}
            value={loadedPlace.title}
            valid={true}
          />
          <Input
            id='description'
            element='textarea'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid description'
            onInput={inputHandler}
            value={loadedPlace.description}
            valid={true}
          />

          <Button type='submit' disabled={!formState.isValid}>
            Update Place
          </Button>
        </form>
      )}
    </>
  );
}

export default UpdatePlace;
