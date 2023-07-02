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
  Container,
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
  const [successmsg, setSuccessMsg] = useState('');
  let navigate = useNavigate();

  const [updateUser, { error }] = useMutation(UPDATE_USER);
  const { data } = useQuery(QUERY_ME);
  const user = data?.me || {};

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
          navigate('../profile', { replace: true });
        }
      } catch (e) {
        console.error(e);
      }
    },
  });

  return (
    <Box display="flex" bg="gray.100">
      <Container display="grid" gap="20px" maxW={'5xl'} py={12}>
        <Heading align="center" mb="40px">Editeaza Profilul</Heading>

        <Box bg="white" p={6} rounded="md">
          <form
            onSubmit={e => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
          >
            <FormControl isRequired mb="20px">
              <FormLabel htmlFor="username">Nume utilizator</FormLabel>
              <Input
                id="username"
                name="username"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
            </FormControl>
            <FormControl isRequired mb="20px">
              <FormLabel htmlFor="email">Adresa email</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </FormControl>
            <FormControl mb="20px">
              <FormLabel htmlFor="weight">Greutate</FormLabel>
              <Input
                id="weight"
                name="weight"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.weight}
              />
            </FormControl>
            <FormControl mb="20px">
              <FormLabel htmlFor="height">Inaltime</FormLabel>
              <Input
                id="height"
                name="height"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.height}
              />
            </FormControl>
            <FormControl mb="20px">
              <FormLabel htmlFor="age">Varsta</FormLabel>
              <Input
                id="age"
                name="age"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.age}
              />
            </FormControl>
            <FormControl as="fieldset" mb="20px">
              <FormLabel as="legend">Gen</FormLabel>
              <RadioGroup value={formik.values.gender}>
                <HStack spacing="24px">
                  <Radio
                    name="gender"
                    onChange={formik.handleChange}
                    value="Masculin"
                  >
                    Male
                  </Radio>
                  <Radio
                    name="gender"
                    onChange={formik.handleChange}
                    value="Feminin"
                  >
                    Female
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl mb="20px">
              <FormLabel htmlFor="birthday">Zi de nastere</FormLabel>
              <Input
                id="birthday"
                name="birthday"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.birthday}
              />
            </FormControl>

            <FormControl mb="20px">
              <FormLabel htmlFor="country">Tara</FormLabel>
              <Input
                id="country"
                name="country"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.country}
              />
            </FormControl>

            <FormControl mb="20px">
              <FormLabel htmlFor="city">Oras</FormLabel>
              <Input
                id="city"
                name="city"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.city}
              />
            </FormControl>

            <FormControl mb="20px">
              <FormLabel htmlFor="address">Adresa</FormLabel>
              <Input
                id="address"
                name="address"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.address}
              />
            </FormControl>

            <FormControl mb="20px">
              <FormLabel htmlFor="phone">Nr. telefon</FormLabel>
              <Input
                id="phone"
                name="phone"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
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
                Editeaza
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
      </Container>
    </Box>
  );
}
