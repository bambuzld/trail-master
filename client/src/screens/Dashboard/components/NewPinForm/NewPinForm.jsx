import React from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button
} from '@chakra-ui/core';

import {GraphQLClient} from 'graphql-request'

import { useMutation } from '@apollo/react-hooks';

import { CREATE_PIN_MUTATION } from 'graphql/mutations';

const NewPinForm = () => {
    // const [createPin,{data}] = useMutation(CREATE_PIN_MUTATION)
  return (
    <Formik
      initialValues={{}}
      onSubmit={async (values, actions) => {
          try{
            const client = new GraphQLClient('http://localhost:4000/graphql')
          const {title,image,content,longitude,latitude} = values
          const input = {
            title,image,content,latitude: parseInt(latitude), longitude: parseInt(longitude)
          }
          await client.request(CREATE_PIN_MUTATION, input)
          }catch(e){console.error(e)}
      }}
      render={props => (
        <form onSubmit={props.handleSubmit}>
          <Field
            name="title"
            // validate={validateName}
            render={({ field, form }) => (
              <FormControl isInvalid={form.errors.title && form.touched.title}>
                <FormLabel htmlFor="title">Pin title</FormLabel>
                <Input {...field} id="title" placeholder="title" />
                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
              </FormControl>
            )}
          />
          <Field
            name="content"
            // validate={validateName}
            render={({ field, form }) => (
              <FormControl
                isInvalid={form.errors.content && form.touched.content}
              >
                <FormLabel htmlFor="content">Content</FormLabel>
                <Input {...field} id="content" placeholder="content" />
                <FormErrorMessage>{form.errors.content}</FormErrorMessage>
              </FormControl>
            )}
          />
          <Field
            name="image"
            // validate={validateName}
            render={({ field, form }) => (
              <FormControl isInvalid={form.errors.image && form.touched.image}>
                <FormLabel htmlFor="image">Pin Image</FormLabel>
                <Input {...field} id="image" placeholder="image" />
                <FormErrorMessage>{form.errors.image}</FormErrorMessage>
              </FormControl>
            )}
          />
          <Field
            name="latitude"
            // validate={validateName}
            render={({ field, form }) => (
              <FormControl
                isInvalid={form.errors.latitude && form.touched.latitude}
              >
                <FormLabel htmlFor="latitude">Latitude</FormLabel>
                <Input {...field} id="latitude" placeholder="latitude" />
                <FormErrorMessage>{form.errors.latitude}</FormErrorMessage>
              </FormControl>
            )}
          />
          <Field
            name="longitude"
            // validate={validateName}
            render={({ field, form }) => (
              <FormControl
                isInvalid={form.errors.longitude && form.touched.longitude}
              >
                <FormLabel htmlFor="longitude">Longitude</FormLabel>
                <Input {...field} id="longitude" placeholder="longitude" />
                <FormErrorMessage>{form.errors.longitude}</FormErrorMessage>
              </FormControl>
            )}
          />

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
            onClick={() => {}}
          >
            Cancel
          </Button>
        </form>
      )}
    />
  );
};

export default NewPinForm;
