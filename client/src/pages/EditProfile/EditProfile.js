// profile page shows ...
// Name
// Goals
// Plans
// Posts?
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  HStack,
  Heading,
  Text,
  Button,
  Stack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useFormik } from 'formik';

import { useQuery } from '@apollo/client';

import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import { calculateBMI } from '../../utils/helpers';

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function EditProfile() {
  // success to show message profile updated successfully.
  const [successmsg, setSuccessMsg] = useState('');
  let navigate = useNavigate();

  const [updateUser, { error }] = useMutation(UPDATE_USER);
  const { data } = useQuery(QUERY_ME);
  const user = data?.me || {};
  console.log({ user });
  // create form variables
  const formik = useFormik({
    initialValues: {
      username: user.username ? user.username : '',
      email: user.email ? user.email : '',
      isPrivate: user.isPrivate ? '1' : '0',
      weight: user.weight ? user.weight : '',
      height: user.height ? user.height : '',
      age: user.age ? user.age : '',
      gender: user.gender ? user.gender : '',
      birthday: user.birthday ? user.birthday : '',
      country: user.country ? user.country : '',
      city: user.city ? user.city : '',
      address: user.address ? user.address : '',
      phone: user.phone ? user.phone : '',
    },
    enableReinitialize: true,
    onSubmit: async ({
      username,
      email,
      isPrivate,
      weight,
      height,
      age,
      gender,
      birthday,
      country,
      city,
      address,
      phone,
    }) => {
      try {
        isPrivate = isPrivate === '1' ? true : false;
        const bmi = calculateBMI(height, weight);

        console.log({ bmi });

        await updateUser({
          variables: {
            username,
            email,
            isPrivate,
            weight,
            height,
            age,
            gender,
            bmi,
            birthday,
            country,
            city,
            address,
            phone,
          },
        });
        if (error) {
          throw new Error('something went wrong!');
        } else {
          //setSuccessMsg("Your profile has been updated successfully.");
          navigate('../profile', { replace: true });
        }
      } catch (e) {
        console.error(e);
      }
    },
  });

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={'75vw'}>
        <Heading>Edit Profile</Heading>
        <form
          onSubmit={e => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <FormControl isRequired>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              name="username"
              type="text"
              variant="filled"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              variant="filled"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="weight">Weight</FormLabel>
            <Input
              id="weight"
              name="weight"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.weight}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="height">Height</FormLabel>
            <Input
              id="height"
              name="height"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.height}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="age">Age</FormLabel>
            <Input
              id="age"
              name="age"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.age}
            />
          </FormControl>
          <FormControl as="fieldset">
            <FormLabel as="legend">Gender</FormLabel>
            <RadioGroup value={formik.values.gender}>
              <HStack spacing="24px">
                <Radio
                  name="gender"
                  onChange={formik.handleChange}
                  value="Male"
                >
                  Male
                </Radio>
                <Radio
                  name="gender"
                  onChange={formik.handleChange}
                  value="Female"
                >
                  Female
                </Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="birthday">Birthday</FormLabel>
            <Input
              id="birthday"
              name="birthday"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.birthday}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Input
              id="country"
              name="country"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.country}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="city">City</FormLabel>
            <Input
              id="city"
              name="city"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.city}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              id="address"
              name="address"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="phone">phone</FormLabel>
            <Input
              id="phone"
              name="phone"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
          </FormControl>

          <FormControl as="fieldset">
            <FormLabel as="legend">Private Profile?</FormLabel>
            <RadioGroup value={formik.values.isPrivate}>
              <HStack spacing="24px">
                <Radio
                  name="isPrivate"
                  value="1"
                  onChange={formik.handleChange}
                >
                  Yes
                </Radio>
                <Radio
                  name="isPrivate"
                  value="0"
                  onChange={formik.handleChange}
                >
                  No
                </Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              type="submit"
              loadingText="Submitting"
              size="lg"
              bg={'green'}
              color={'white'}
              _hover={{
                bg: 'darkgreen',
              }}
            >
              Submit
            </Button>
          </Stack>
        </form>
        {successmsg && (
          <Stack spacing={3}>
            <Alert status="success">
              <AlertIcon />
              {successmsg}
            </Alert>
          </Stack>
        )}{' '}
      </Box>
    </Flex>
  );
}
