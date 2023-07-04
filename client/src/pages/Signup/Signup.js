import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Container,
  Radio,
  RadioGroup
} from '@chakra-ui/react';
import { useState } from 'react';
import { useFormik } from 'formik';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import { validatePassword } from '../../utils/helpers';

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [addUser, { error }] = useMutation(ADD_USER);
  //   need to add BMI/Fitness goal input options
  const [errorMessage, setErrorMessage] = useState('');

  // create form variables
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      userRole: ''
    },
    onSubmit: async ({ username, email, password, userRole }) => {
      try {
        console.log('before addUser');
        const { data } = await addUser({
          variables: { username, email, password, userRole },
        });
        console.log('after addUser');
        Auth.login(data.addUser.token);
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
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Înregistrare cont
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
                <FormControl isRequired mb="20px">
                  <FormLabel htmlFor="username">Nume</FormLabel>
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
                <FormControl isRequired mb="20px">
                  <FormLabel htmlFor="password">Parolă</FormLabel>
                  <InputGroup>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      variant="filled"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword(showPassword => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl isRequired as="fieldset" mb="20px">
                  <FormLabel as="legend">Tip utilizator</FormLabel>
                  <RadioGroup value={formik.values.userRole}>
                      <Radio
                        name="userRole"
                        onChange={formik.handleChange}
                        value="Client"
                        mr="10px"
                      >
                        Client
                      </Radio>
                      <Radio
                        name="userRole"
                        onChange={formik.handleChange}
                        value="Medic"
                        mr="10px"
                      >
                        Medic
                      </Radio>
                      <Radio
                        name="userRole"
                        onChange={formik.handleChange}
                        value="Trainer"
                        mr="10px"
                      >
                        Trainer
                      </Radio>
                      <Radio
                        name="userRole"
                        onChange={formik.handleChange}
                        value="Psiholog"
                        mr="10px"
                      >
                        Psiholog
                      </Radio>
                      <Radio
                        name="userRole"
                        onChange={formik.handleChange}
                        value="Nutritionist"
                        mr="10px"
                      >
                        Nutritionist
                      </Radio>
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
                    Înregistrare
                  </Button>
                </Stack>
              </form>
              {errorMessage && (
                <Stack spacing={3}>
                  <Alert status="error">
                    <AlertIcon />
                    {errorMessage}
                  </Alert>
                </Stack>
              )}
              <Stack pt={6}>
                <Text align={'center'}>
                  Ai cont?{' '}
                  <Link as={RouterLink} to="/login" color={'darkgreen'}>
                    Conectează-te
                  </Link>
                  {/* link back to login if already a user */}
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
