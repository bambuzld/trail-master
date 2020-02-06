import React, { useContext } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button
} from '@chakra-ui/core';


import { GraphQLClient } from 'graphql-request';
import { MainContext } from 'containers/mainContext';
import {useNotification} from 'utils/useNotifications'
import { useMutation } from '@apollo/react-hooks';

import { CREATE_PIN_MUTATION } from 'graphql/mutations';

const NewPinForm = ({ onClose }) => {
  // const [createPin,{data}] = useMutation(CREATE_PIN_MUTATION)
  const {
    map: { draftPin }
  } = useContext(MainContext);

  const [payload,addNotification] = useNotification()
  const { longitude, latitude } = draftPin;
  return (
    <Formik
      initialValues={{
        longitude,
        latitude
      }}
      onSubmit={async (values, actions) => {
        try {
          const idToken = window.gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getAuthResponse().id_token;
          const client = new GraphQLClient('http://localhost:4000/graphql', {
            headers: { authorization: idToken }
          });
          const { title, image, content, longitude, latitude } = values;
          const input = {
            title,
            image,
            content,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
          };
          await client.request(CREATE_PIN_MUTATION, input);
          onClose();
          addNotification({status:'success',text: 'Pin added successfully',duration: 3000})
        } catch (e) {
          addNotification({status:'error',text: 'There was a problem with adding pin',duration: 3000})
          console.error(e);
        }
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Field name="title" >
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
