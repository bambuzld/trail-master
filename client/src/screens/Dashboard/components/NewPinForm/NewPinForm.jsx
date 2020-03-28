import React, {
  useEffect,
  useState,
  useMemo,
  useCallback
} from 'react';

import axios from 'axios';

import { Formik, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Select
} from '@chakra-ui/core';

import { useMainContext } from 'containers/mainContext';
import { useNotification } from 'utils/useNotifications';
import { useClient } from 'utils/Hooks';

import { CREATE_TRAIL_MUTATION } from 'graphql/mutations';
import { GET_TRAILS_QUERY } from 'graphql/queries';

import getDistance from 'geolib/es/getDistance';

const getTotalDistance = trailPath => {
  let totalDistance = 0;
  trailPath.forEach((coords, index) => {
    if (index < trailPath.length - 1) {
      totalDistance += getDistance(
        { longitude: trailPath[index][0], latitude: trailPath[index][1] },
        {
          longitude: trailPath[index + 1][0],
          latitude: trailPath[index + 1][1]
        }
      );
    }
  });
  return totalDistance;
};

const getElevationDataForTrailPath = async locations => {
  let parsedLocations = '';
  locations.forEach((location, index) => {
    if (index !== locations.length - 1) {
      parsedLocations += `${location.latitude},${location.longitude}|`;
    } else {
      parsedLocations += `${location.latitude},${location.longitude}`;
    }
  });

  try {
    const elevationData = await axios.post(
      `https://api.jawg.io/elevations/locations?access-token=FwOKqfwcdcw0hB5Qt5Kh5cB6DWmYOvOEX0NUORodEcWmRkWXMz7xgyhWlL5e8ktM`,
      {
        locations: parsedLocations
      }
    );
    return elevationData.data;
  } catch (e) {
    console.error(e);
  }
};

const NewPinForm = ({ onClose }) => {
  const client = useClient();
  const {
    map: { draftPin, trail },
    dispatch
  } = useMainContext();
  const [addNotification] = useNotification();
  const [elevationData, setElevationData] = useState(null);
  const [elevationDiff, setElevationDiff] = useState(null);
  const { longitude, latitude } = draftPin || {};

  const trailPath = useMemo(()=>{
    return trail.features[0].geometry.coordinates
  },[trail])

  const totalDistance = useMemo(() => {
    return getTotalDistance(trailPath);
  }, [trailPath]);

  useEffect(() => {
    const locations = trailPath.map(point => ({
      latitude: point[1],
      longitude: point[0]
    }));
    getElevationDataForTrailPath(locations)
      .then(result => {
        setElevationData(result);
        const firstPoint = result[0].elevation;
        const lastPoint = result[result.length - 1].elevation;

        setElevationDiff(Math.abs(lastPoint - firstPoint));
      })
      .catch(err => console.error(err));
  }, [trailPath]);
  // useEffect(() => {}, [trailPath]);

  if (!elevationDiff) return null;
  return (
    <Formik
      initialValues={{
        length: totalDistance / 1000,
        elevation: elevationDiff
      }}
      onSubmit={async (values, actions) => {
        try {
              const { name, description, level, type } = values;
              const input = {
                name,
                description,
                level,
                type,
                path: trailPath,
                elevation: elevationData.map(record => record.elevation),
                geoJson: trail
              };
              await client.request(CREATE_TRAIL_MUTATION, input);
              onClose();
              addNotification({
                status: 'success',
                text: 'Trail added successfully',
                duration: 3000
              });
              dispatch({
                type: 'UPDATE_DRAFT_PIN',
                payload: null
              });
              const payload = await client.request(GET_TRAILS_QUERY);
              dispatch({ type: 'GET_TRAILS', payload: payload.getTrails });
            } catch (e) {
          addNotification({
            status: 'error',
            text: 'There was a problem with adding the trail',
            duration: 3000
          });
          console.error(e);
        }
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Field name="name">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input {...field} id="name" placeholder="Add name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field
            name="description"
            // validate={validateName}
          >
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.description && form.touched.description}
              >
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                  {...field}
                  id="description"
                  placeholder="Add description"
                />
                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field
            name="level"
            // validate={validateName}
          >
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.level && form.touched.level}>
                <FormLabel htmlFor="image">Trail level</FormLabel>
                {/* <Input {...field} id="level" placeholder="choose level" /> */}
                <Select
                  variant="filled"
                  placeholder="Select level"
                  {...field}
                  id="level"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="pro">Pro</option>
                </Select>
                <FormErrorMessage>{form.errors.level}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field
            name="type"
            // validate={validateName}
          >
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.type && form.touched.type}>
                <FormLabel htmlFor="type">Trail type</FormLabel>
                {/* <Input {...field} id="level" placeholder="choose level" /> */}
                <Select
                  variant="filled"
                  placeholder="Select type"
                  {...field}
                  id="type"
                >
                  <option value="singletrack">Singletrack</option>
                  <option value="forestroad">Forest Road</option>
                  <option value="road">Road</option>
                </Select>
                <FormErrorMessage>{form.errors.level}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field
            name="length"
            // validate={validateName}
          >
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.length && form.touched.length}
              >
                <FormLabel htmlFor="length">Trail length (km)</FormLabel>
                <Input {...field} id="length" isDisabled />
                <FormErrorMessage>{form.errors.length}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field
            name="elevation"
            // validate={validateName}
          >
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.elevation && form.touched.elevation}
              >
                <FormLabel htmlFor="elevation">Elevation (m)</FormLabel>
                <Input {...field} id="elevation" isDisabled />
                <FormErrorMessage>{form.errors.elevation}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button
            mt={4}
            isLoading={props.isSubmitting}
            type="submit"
            color="brandOrange"
            mr={4}
          >
            Submit
          </Button>
          <Button
            mt={4}
            color="darkGrey"
            isLoading={props.isSubmitting}
            onClick={() => onClose()}
          >
            Cancel
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default NewPinForm;
