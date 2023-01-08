// profile page shows ...
// Name
// Goals
// Plans
// Posts?
import React, { useState } from 'react';

import {
  Container,
  Box,
  SimpleGrid,
  Flex,
  Heading,
  Alert,
  AlertIcon,
  Text,
  Button,
  ButtonGroup,
  Stack,
  StackDivider,
  Center,
  useColorModeValue,
  Avatar,
  ListItem,
  UnorderedList,
  List,
  Link,
  CircularProgress,
  textDecoration,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Image,
  CircularProgressLabel,
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

import goalLogo from '../../assets/images/goal-photo.jpg';
import exerciseLogo from '../../assets/images/exercice-photo.jpg';
import mealLogo from '../../assets/images/meal-photo.jpg';
import postLogo from '../../assets/images/post-photo.jpg';

const Feature = ({ text, srcImg }) => {
  return (
    <Stack direction={'row'} align={'center'} flexDirection={'column'}>
      {/* <Flex 
          w={8}
          h={8}
          align={'center'}
          justify={'center'}
          rounded={'full'}
          margin={'0 0 16px 0'}
          bg={iconBg}>
          {icon}
        </Flex> */}

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

  // ISSUES
  // stores data in localstorage but only after loading the page
  // On page load, no data is there to use
  // This throws an error if I uncomment line 135 and try running it
  const { loading, error, data } = useQuery(QUERY_ME);
  const user = data?.me || {};

  //console.log(user)
  // MOVE USECOLORMODEVALUE TO VARIABLES SET BEFORE IF STATEMENT
  if (loading) {
    return (
      <Center>
        <CircularProgress h={'100vh'} isIndeterminate />
      </Center>
    );
  }

  // const targetWeight = user.goals[0].goalWeight;
  // console.log(targetWeight);
  // if data isn't here yet, say so

  return (
    <Box display="flex">
      <Container maxW={'5xl'} py={12}>
        {/* <Box borderWidth='2px' borderRadius='lg' mb='5' overflow='hidden'> */}
        <Heading>{user.username}'s Profile</Heading>
        <SimpleGrid spacing={10} py={12}>
          <Stack spacing={4} align="center">
            {/* <Center> */}
            <Avatar size="xl" name={user.username} src="https://bit.ly/" />{' '}
            {/* </Center> */}
            {(user.gender || user.age || user.weight || user.height) && (
              <UnorderedList
                color={'gray.500'}
                fontSize={'lg'}
                listStyleType={'none'}
                display={'flex'}
                gap={'16px'}
              >
                {user.gender && <ListItem>{user.gender}</ListItem>}
                {user.age && <ListItem>{user.age} years old</ListItem>}
                {user.weight && <ListItem>{user.weight} pounds</ListItem>}
                {user.height && <ListItem>{user.height} inches</ListItem>}
              </UnorderedList>
            )}
            <Link as={RouterLink} to="/profile/edit">
              <Button
                leftIcon={<BsFillPersonLinesFill />}
                px={8}
                bg={buttonBg}
                color={'white'}
                rounded={'md'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                Edit Profile
              </Button>
            </Link>
          </Stack>
          <Stack
            align="left"
            display={'grid'}
            gridTemplateColumns={'1fr 1fr'}
            gap={'40px'}
            // divider={
            // <StackDivider
            //   borderColor={dividerBorder}
            // />
            // }
          >
            <Stack
              border={'1px solid transparent'}
              padding={'10px'}
              borderRadius={'8px'}
              boxShadow={'0px 0px 10px -2px #ACACAC'}
              margin={'0'}
            >
              <Accordion allowToggle>
                <AccordionItem border={'none'}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Feature
                        srcImg={goalLogo}
                        text={`Your current goal`}

                        // add goal
                      />
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel pb={4}>
                    {user.goals
                      .slice(0)
                      .reverse()
                      .map((item, index) => (
                        <CircularProgress
                          value={(item.goalWeight / user.weight) * 100}
                          color="green"
                        >
                          <CircularProgressLabel>
                            {console.log(user)}
                            {(item.goalWeight / user.weight) * 100} %
                          </CircularProgressLabel>
                        </CircularProgress>
                      ))}

                    {user.exercisePlan.length > 0 && (
                      <UnorderedList listStyleType={'none'}>
                        {user.goals
                          .slice(0)
                          .reverse()
                          .map((item, index) => (
                            <ListItem key={index}>
                              {item.goalWeight} lbs
                            </ListItem>
                          ))}
                      </UnorderedList>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Stack>

            <Stack
              border={'1px solid transparent'}
              padding={'10px'}
              borderRadius={'8px'}
              boxShadow={'0px 0px 10px -2px #ACACAC'}
              margin={'0'}
            >
              <Accordion allowToggle>
                <AccordionItem border={'none'}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Feature
                        srcImg={exerciseLogo}
                        text={`Your current exercise plan`}

                        // add exercise plan
                      />
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel pb={4}>
                    {user.exercisePlan.length > 0 && (
                      <UnorderedList listStyleType={'none'}>
                        {user.exercisePlan
                          .slice(0)
                          .reverse()
                          .map(item => (
                            <ListItem key={item.id}>{item.name}</ListItem>
                          ))}
                      </UnorderedList>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Stack>

            <Stack
              border={'1px solid transparent'}
              padding={'10px'}
              borderRadius={'8px'}
              boxShadow={'0px 0px 10px -2px #ACACAC'}
              margin={'0'}
            >
              <Accordion allowToggle>
                <AccordionItem border={'none'}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Feature
                        srcImg={mealLogo}
                        text={`Your current meal plan`}

                        // add meal plan
                      />
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    {user.mealPlan.length > 0 && (
                      <UnorderedList listStyleType={'none'}>
                        {user.mealPlan
                          .slice(0)
                          .reverse()
                          .map(item => (
                            <ListItem key={item.id}>{item.name}</ListItem>
                          ))}
                      </UnorderedList>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Stack>

            <Stack
              border={'1px solid transparent'}
              padding={'10px'}
              borderRadius={'8px'}
              boxShadow={'0px 0px 10px -2px #ACACAC'}
              margin={'0'}
            >
              <Accordion allowToggle>
                <AccordionItem border={'none'}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Feature
                        srcImg={postLogo}
                        text={`Your most recent post`}

                        // add post
                      />
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    {user.posts.length > 0 && (
                      <UnorderedList listStyleType={'none'}>
                        {user.posts.map(item => (
                          <ListItem key={item.id}>{item.createdAt}</ListItem>
                        ))}
                      </UnorderedList>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Stack>
          </Stack>
        </SimpleGrid>
        {/* </Box> */}
        <Box align="center">
          <Heading>Actions</Heading>
          <ButtonGroup variant="outline" spacing="6">
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
            <Button
              leftIcon={<BsTools />}
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
              Edit Goal
            </Button>
          </ButtonGroup>
        </Box>
      </Container>
    </Box>
  );
}
