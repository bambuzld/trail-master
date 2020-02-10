import React, { useContext } from 'react';
import { Formik, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button
} from '@chakra-ui/core';

import { MainContext } from 'containers/mainContext';
import { useNotification } from 'utils/useNotifications';
import { useClient } from 'utils/Hooks';

import { CREATE_PIN_MUTATION } from 'graphql/mutations';
import { GET_PINS_QUERY } from 'graphql/queries';

const NewPinForm = ({ onClose }) => {
  const client = useClient();
  const {
    map: { draftPin },
    dispatch
  } = useContext(MainContext);

  const [addNotification] = useNotification();
  const { longitude, latitude } = draftPin || {};
  return (
    <Formik
      initialValues={{
        longitude,
        latitude
      }}
      onSubmit={async (values, actions) => {
        try {
          const { title, image, content, longitude, latitude } = values;
          const input = {
            title,
            image,
            content,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
          };
          await client.request(CREATE_PIN_MUTATION, input);
          const pins = await client.request(GET_PINS_QUERY);
          dispatch({ type: 'GET_PINS', payload: pins.getPins });
          onClose();
          addNotification({
            status: 'success',
            text: 'Pin added successfully',
            duration: 3000
          });
          dispatch({
            type: 'UPDATE_DRAFT_PIN',
            payload: null
          });
        } catch (e) {
          addNotification({
            status: 'error',
            text: 'There was a problem with adding pin',
            duration: 3000
          });
          console.error(e);
        }
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Field name="title">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.title && form.touched.title}>
                <FormLabel htmlFor="title">Pin title</FormLabel>
                <Input {...field} id="title" placeholder="title" />
                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field
            name="content"
            // validate={validateName}
          >
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.content && form.touched.content}
              >
                <FormLabel htmlFor="content">Content</FormLabel>
                <Input {...field} id="content" placeholder="content" />
                <FormErrorMessage>{form.errors.content}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field
            name="image"
            // validate={validateName}
          >
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.image && form.touched.image}>
                <FormLabel htmlFor="image">Pin Image</FormLabel>
                <Input {...field} id="image" placeholder="image" />
                <FormErrorMessage>{form.errors.image}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field
            name="latitude"
            // validate={validateName}
          >
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.latitude && form.touched.latitude}
              >
                <FormLabel htmlFor="latitude">Latitude</FormLabel>
                <Input
                  {...field}
                  id="latitude"
                  placeholder="latitude"
                  isDisabled={true}
                />
                <FormErrorMessage>{form.errors.latitude}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field
            name="longitude"
            // validate={validateName}
          >
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.longitude && form.touched.longitude}
              >
                <FormLabel htmlFor="longitude">Longitude</FormLabel>
                <Input
                  {...field}
                  id="longitude"
                  placeholder="longitude"
                  isDisabled={true}
                />
                <FormErrorMessage>{form.errors.longitude}</FormErrorMessage>
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
