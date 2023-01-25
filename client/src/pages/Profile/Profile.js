import React, { useState } from 'react';

import { format } from 'date-fns';

import { useFormik } from 'formik';

import {
  FormControl,
  FormLabel,
  Input,
  Container,
  Box,
  SimpleGrid,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
  Button,
  Stack,
  Center,
  useColorModeValue,
  Avatar,
  ListItem,
  UnorderedList,
  Link,
  CircularProgress,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  chakra,
} from '@chakra-ui/react';

import {
  BsFillPersonLinesFill,
  BsTools,
  BsFillPlusCircleFill,
} from 'react-icons/bs';

import { useQuery } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';

import theme from '../../Theme';
import Auth from '../../utils/auth';
import { QUERY_ME } from '../../utils/queries';
import { FaMousePointer } from 'react-icons/fa';

import { useMutation } from '@apollo/client';
import { ADD_GOAL } from '../../utils/mutations';

import '../../styles/general.scss';

import { useNavigate } from 'react-router-dom';

const Feature = ({ text, srcImg }) => {
  return (
    <Stack direction={'row'} align={'center'} flexDirection={'column'}>
      <Image
        borderRadius="full"
        boxSize="150px"
        mb={'20px'}
        src={srcImg}
        alt="Goal img"
      />
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function Profile() {
  const [newGoal, { error: addGoalError }] = useMutation(ADD_GOAL);
  const [goaldata, setGoalData] = useState('');

  let navigate = useNavigate();

  const {
    isOpen: editModalIsOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();
  const {
    isOpen: removeModalIsOpen,
    onOpen: onRemoveAccountOpen,
    onClose: onRemoveAccountClose,
  } = useDisclosure();

  const buttonBg = useColorModeValue('#151F21', 'gray.900');
  const recentPostBg = useColorModeValue(theme.colors.darkgreen, 'red.900');
  const currentMealPlanBg = useColorModeValue(
    theme.colors.lightblue,
    'purple.900'
  );
  const currentExerciseBg = useColorModeValue(
    theme.colors.lightgreen,
    'teal.900'
  );
  const currentGoalBg = useColorModeValue(theme.colors.grey, 'yellow.900');
  const dividerBorder = useColorModeValue('gray.100', 'gray.700');

  const { loading, error, data } = useQuery(QUERY_ME);
  const user = data?.me || {};

  const editGoalForm = useFormik({
    initialValues: {
      custom: '',
    },
    enableReinitialize: true,
    onSubmit: async ({ custom }) => {
      try {
        await addGoal({
          variables: {
            custom,
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

  console.log(user);
  if (loading) {
    return (
      <Center>
        <CircularProgress h={'100vh'} isIndeterminate />
      </Center>
    );
  }

  //post a goal

  const textChange = event => {
    const { value } = event.target;
    setGoalData(value);
  };

  const addGoal = async text => {
    const newGoalArray = [];

    const createGoal = await newGoal({
      variables: {
        goals: {
          goalCustom: text,
          goalWeight: '',
          goalExercise: {},
        },
      },
      // refetchQueries: [{ query: GET_POSTS }, 'posts'],
    });
  };

  return (
    <>
      <Box display="flex">
        <Container display="grid" gap="20px" maxW={'5xl'} py={12}>
          <Heading mb="40px">Your Profile</Heading>
          <Stack
            border={'1px solid transparent'}
            borderRadius={'8px'}
            boxShadow={'0px 0px 10px -2px #ACACAC'}
            padding="20px"
          >
            <Heading size="md" className="sub-heading">
              Datele tale
            </Heading>
            <Box
              display="grid"
              gridTemplateColumns="auto 1fr"
              alignItems="center"
            >
              <Heading size="sm">Username:</Heading>
              <span>{user.username}</span>
            </Box>
            <Box
              display="grid"
              gridTemplateColumns="auto 1fr"
              alignItems="center"
            >
              <Heading size="sm">Abonament:</Heading>
              <Link as={RouterLink} to="/subscription">
                Go to Subscription page
              </Link>
            </Box>
          </Stack>

          <Stack
            border={'1px solid transparent'}
            borderRadius={'8px'}
            boxShadow={'0px 0px 10px -2px #ACACAC'}
            padding="20px"
          >
            <Heading size="md" className="sub-heading">
              Cardurile tale
            </Heading>
            <Box display="grid" gap="20px" textAlign="center">
              <Heading size="sm">Nu ai nici un card adaugat</Heading>
              <span>
                Pentru a putea plati mai usor, adauga cardul tau.Poti oricand sa
                stergi cardurile din aplicatie.
              </span>
              <Button children="Adauga un card" />
            </Box>
          </Stack>

          <Stack
            border={'1px solid transparent'}
            borderRadius={'8px'}
            boxShadow={'0px 0px 10px -2px #ACACAC'}
            padding="20px"
          >
            <Heading size="md" className="sub-heading">
              INFORMATII PERSONALE
            </Heading>
            <Box>
              <Box mb="20px">
                Te rugam sa ne tii la curent cu orice modificare a acestor date.
              </Box>
              <SimpleGrid gridTemplateColumns="1fr 1fr">
                <SimpleGrid gap="20px">
                  <Box>
                    <Heading size="xs">Username</Heading>
                    <div>{user.username}</div>
                  </Box>
                  <Box>
                    <Heading size="xs">Email</Heading>
                    <div>{user.email}</div>
                  </Box>
                  <Box display={user.birthday ? 'block' : 'none'}>
                    <Heading size="xs">Birthday</Heading>
                    <div>{format(new Date(user.birthday), 'yyyy/mm/dd')}</div>
                  </Box>
                  <Box display={user.gender ? 'block' : 'none'}>
                    <Heading size="xs">Gender</Heading>
                    <div>{user.gender}</div>
                  </Box>
                  <Box display={user.country ? 'block' : 'none'}>
                    <Heading size="xs">Country</Heading>
                    <div>{user.country}</div>
                  </Box>
                  <Box display={user.city ? 'block' : 'none'}>
                    <Heading size="xs">City</Heading>
                    <div>{user.city}</div>
                  </Box>
                  <Box display={user.address ? 'block' : 'none'}>
                    <Heading size="xs">Address</Heading>
                    <div>{user.address}</div>
                  </Box>

                  <Link as={RouterLink} to="/profile/edit">
                    <Button
                      children="Modifica date personale"
                      leftIcon={<BsFillPersonLinesFill />}
                      px={8}
                      bg={buttonBg}
                      color={'white'}
                      rounded={'md'}
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                      }}
                    />
                  </Link>
                </SimpleGrid>
                <SimpleGrid gap="20px" alignSelf="center">
                  <Avatar
                    justifySelf="center"
                    size="xl"
                    name={user.username}
                    src="https://bit.ly/"
                  />{' '}
                  <Button children="Adauga poza de profil" />
                </SimpleGrid>
              </SimpleGrid>
            </Box>
            <Alert
              display={user.birthday !== null ? 'none' : 'flex'}
              status="error"
            >
              <AlertIcon />
              <AlertTitle>Your profile is not complete!</AlertTitle>
              <AlertDescription>
                Adauga toate informatiile pe profilul tau.
              </AlertDescription>
            </Alert>
          </Stack>

          {/* <Stack
            border={'1px solid transparent'}
            borderRadius={'8px'}
            boxShadow={'0px 0px 10px -2px #ACACAC'}
            padding="20px"
          >
            <Heading size="md" className="sub-heading">
              Adauga/Editeaza goal
            </Heading>
            <Heading size="sm">You're current goals:</Heading>
            <UnorderedList>
              {user.goals
                .slice(0)
                .reverse()
                .map((item, index) => (
                  <ListItem>{item}</ListItem>
                ))}
            </UnorderedList>
            <Alert
              display={user.goals.length > 0 ? 'none' : 'flex'}
              status="error"
            >
              <AlertIcon />
              <AlertTitle>Your don't have goals!</AlertTitle>
              <AlertDescription>Seteaza-ti telurile.</AlertDescription>
            </Alert>
            <Button
              leftIcon={<BsTools />}
              px={8}
              bg={buttonBg}
              color={'white'}
              rounded={'md'}
              onClick={onAddModalOpen}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Add Goal
            </Button>
          </Stack> */}

          <Stack
            border={'1px solid transparent'}
            borderRadius={'8px'}
            boxShadow={'0px 0px 10px -2px #ACACAC'}
            padding="20px"
          >
            <Heading size="md" className="sub-heading">
              Planul tau de exercitii
            </Heading>
            <Button
              leftIcon={<BsFillPlusCircleFill />}
              px={8}
              bg={buttonBg}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              // onClick={console.log("poke")}
            >
              Create Exercise Plan
            </Button>
            <Alert
              display={user.exercisePlan.length > 0 ? 'none' : 'flex'}
              status="error"
            >
              <AlertIcon />
              <AlertTitle>You don't have an exercise plan!</AlertTitle>
            </Alert>
          </Stack>

          <Stack
            border={'1px solid transparent'}
            borderRadius={'8px'}
            boxShadow={'0px 0px 10px -2px #ACACAC'}
            padding="20px"
          >
            <Heading size="md" className="sub-heading">
              Planul tau alimentar
            </Heading>
            <Link as={RouterLink} to="/meal-plan">
              <Button
                leftIcon={<BsFillPlusCircleFill />}
                px={5}
                bg={buttonBg}
                color={'white'}
                rounded={'md'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                // onClick={console.log("poke")}
              >
                Create Meal Plan
              </Button>
            </Link>
            <Alert
              display={user.mealPlan.length > 0 ? 'none' : 'flex'}
              status="error"
            >
              <AlertIcon />
              <AlertTitle>You don't have a meal plan!</AlertTitle>
            </Alert>
          </Stack>

          <Stack
            border={'1px solid transparent'}
            borderRadius={'8px'}
            boxShadow={'0px 0px 10px -2px #ACACAC'}
            padding="20px"
          >
            <Heading size="md" className="sub-heading">
              Cea mai recenta postare
            </Heading>
            <Link as={RouterLink} to="/posts">
              <Button
                leftIcon={<BsFillPlusCircleFill />}
                px={8}
                bg={buttonBg}
                color={'white'}
                rounded={'md'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                Create Post
              </Button>
            </Link>
            <Alert
              display={user.posts.length > 0 ? 'none' : 'flex'}
              status="error"
            >
              <AlertIcon />
              <AlertTitle>Your don't any posts!</AlertTitle>
              <AlertDescription>
                Incepe sa scrii in jurnalul tau.
              </AlertDescription>
            </Alert>
          </Stack>

          <Stack
            border={'1px solid transparent'}
            borderRadius={'8px'}
            boxShadow={'0px 0px 10px -2px #ACACAC'}
            padding="20px"
          >
            <Heading size="md" className="sub-heading">
              Stergere cont
            </Heading>
            <Button colorScheme="red" onClick={onRemoveAccountOpen}>
              Sterge contul
            </Button>
          </Stack>
        </Container>
      </Box>

      <Modal isOpen={editModalIsOpen} onClose={onAddModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adauga un goal nou</ModalHeader>
          <ModalCloseButton />
          <chakra.form
            method="post"
            onSubmit={e => {
              e.preventDefault();
              return addGoal(goaldata);
            }}
          >
            <ModalBody pb={6}>
              <FormControl id="addgoal">
                <FormLabel>Add a custom goal</FormLabel>

                <Input type="text" placeholder="Goal" onChange={textChange} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Salveaza
              </Button>
              <Button onClick={onAddModalClose}>Renunta</Button>
            </ModalFooter>
          </chakra.form>
        </ModalContent>
      </Modal>

      <Modal isOpen={removeModalIsOpen} onClose={onRemoveAccountClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Esti sigur ca vrei sa stergi contul?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Daca stergi contul, nu o sa il mai poti recupera.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3}>
              Sterge contul
            </Button>
            <Button variant="ghost" onClick={onRemoveAccountClose}>
              Nu sterg contul
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
