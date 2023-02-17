import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';
import { useFormik } from 'formik';

import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { LOGIN_USER } from '../../utils/mutations';

export default function SimpleCard() {
  const [login, { error }] = useMutation(LOGIN_USER);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    onSubmit: async values => {
      try {
        const { data } = await login({
          variables: { email: values.email, password: values.password },
        });
        Auth.login(data.login.token);
      } catch (e) {
        console.error(e);
      }
    },
  });

  return (
    <Box display="flex" bg="gray.100">
      <Container display="grid" gap="20px" maxW={'5xl'} py={12}>
        <Stack spacing={8} py={12} px={6} justifyContent="center">
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} align="center">
              Conectează-te la contul tău
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  formik.handleSubmit(e);
                }}
              >
                <FormControl>
                  <FormLabel htmlFor="email">Adresă email</FormLabel>
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
                  <FormLabel htmlFor="password">Parolă</FormLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  ></Stack>
                  <Button
                    type="submit"
                    bg={'green'}
                    color={'white'}
                    _hover={{
                      bg: 'darkgreen',
                    }}
                  >
                    Conectare
                  </Button>
                </Stack>
              </form>
              {error && (
                <div className="my-3 p-3 bg-danger text-white">
                  {error.message}
                </div>
              )}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
