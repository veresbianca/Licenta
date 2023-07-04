import React, { useState, useEffect } from 'react';
import {
  GridItem,
  Container,
  SimpleGrid,
  Heading,
  Image,
  Text,
  useMediaQuery,
  Button,
  Stack,
  Box,
  UnorderedList,
  ListItem,
  Link,
  Center
} from '@chakra-ui/react';
import {
  GET_MEDIC,
  GET_NUTRITIONIST,
  GET_PSIHOLOGIST,
  GET_TRAINNER,
  QUERY_ME,
} from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { ADD_FRIEND, REMOVE_FRIEND } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Team() {
  const { loading, error, data: userData } = useQuery(QUERY_ME);
  const [currentUser, setCurrentUser] = useState();
  const [addFriend] = useMutation(ADD_FRIEND);
  const [removeFriend] = useMutation(REMOVE_FRIEND);
  const { loading: loadingMedicData, data: medicData } = useQuery(GET_MEDIC, {
    variables: { type: 'Medic' },
  });
  const { loading: loadingTrainnerData, data: trainnerData } = useQuery(
    GET_TRAINNER,
    {
      variables: { type: 'Trainner' },
    }
  );
  const { loading: loadingNutritionistData, data: nutritionistData } = useQuery(
    GET_NUTRITIONIST,
    {
      variables: { type: 'Nutritionist' },
    }
  );
  const { loading: loadingPsihologistData, data: psihologistData } = useQuery(
    GET_PSIHOLOGIST,
    {
      variables: { type: 'Psiholog' },
    }
  );
  const [isLargerThan426] = useMediaQuery('(min-width: 426px)');
  const [isLargerThan728] = useMediaQuery('(min-width: 728px)');
  const [isLargerThan1025] = useMediaQuery('(min-width: 1025px)');

  const handleClick = async email => {
    console.log(email);
    await addFriend({
      variables: {
        email: email,
      },
    });
  };

  const handleRemoveFriend = async email => {
    await removeFriend({
      variables: {
        email: email,
      },
    });
  };

  useEffect(() => {
    if (userData) {
      setCurrentUser(userData.me);
    }
  }, [userData]);

  console.log(currentUser);

  const findProf = (email) => {
    const result = currentUser?.friends.find(o => o.email === email);

    if (result) {
      return true;
    }
  };

  let navigate = useNavigate();

  const handleGoToMealPlan = (userId) => {
    navigate(`/meal-plan/${userId}`, { replace: true });
  }

  return (
    <Container maxW={'5xl'} py={12}>
      <Stack
        border={'1px solid transparent'}
        borderRadius={'8px'}
        boxShadow={'0px 0px 10px -2px #ACACAC'}
        padding="20px"
      >
        {currentUser?.userRole === 'Client' ? (
          <Heading size="md" className="sub-heading">
            Echipa ta!
          </Heading>
        ) : (
          <Heading size="md" className="sub-heading">
            Clienții tăi!
          </Heading>
        )}

        {currentUser?.friends.length > 0 ? (
          <UnorderedList>
            {currentUser?.friends.map((friend, index) => {
              return (
                <ListItem display="grid" key={index}>
                  <Box
                    display="grid"
                    gridTemplateColumns="auto 1fr 1fr"
                    alignItems="center"
                  >
                    <Heading size="sm">Nume: </Heading>
                    <span>{friend.username}</span>
                    <Box 
                      display="grid"
                      gridTemplateColumns="1fr 1fr 1fr"
                      gap="10px"
                    >
                      <Button 
                        onClick={() => handleRemoveFriend(friend.email)}
                        bg={'green'}
                        w="150px"
                        color={'black'}
                        rounded={'md'}
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: 'lg',
                        }}
                      >
                        Renunță
                      </Button>
                      {currentUser.userRole !== 'Client' ? (
                      <><Button 
                          onClick={() => handleGoToMealPlan(friend.id)}
                          bg={'green'}
                          w="150px"
                          color={'black'}
                          rounded={'md'}
                          _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                          }}
                        >
                        Adauga masa
                      </Button>
                      <Button 
                        onClick={() => {}}
                        bg={'green'}
                        w="150px"
                        color={'black'}
                        rounded={'md'}
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: 'lg',
                        }}
                      >
                        Adauga exercitii
                      </Button></>
                      ) : (<></>)}
                    </Box>
                  </Box>
                  <Box
                    display="grid"
                    gridTemplateColumns="auto 1fr"
                    alignItems="center"
                  >
                    <Heading size="sm">Rol: </Heading>
                    <span>{friend.userRole}</span>
                  </Box>
                </ListItem>
              );
            })}
          </UnorderedList>
        ) : (
          <>
            <Text>Nu ai pe nimeni in echipa ta.</Text>

            {currentUser?.userRole === 'Client' && currentUser.userType === 'yearlySubscription' ? (
              <Text>
                Alege profesioniștii pentru echipa ta, dintre cei de mai jos!
              </Text>
            ) : (
              <>
                  <Text><b>Subsciptia ta: {currentUser.userType}</b> nu iti permite sa adaugi profesionisti.</Text>
                  <Link as={RouterLink} to="/subscription">
                  <Button
                    bg={'green'}
                    w="250px"
                    color={'black'}
                    rounded={'md'}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                  >
                    Cumpara o subscriptie
                  </Button>
                </Link>
              </>
            )}
          </>
        )}
      </Stack>

      {currentUser?.userRole === 'Client' && currentUser.userType === 'yearlySubscription' ? (
        <>
          <Heading
            textAlign="center"
            size="lg"
            mb="60px"
            mt="60px"
            children="Alege din baza noastra de specialisti"
          />
          <SimpleGrid gap={'40px'}>
            <GridItem>
              <Heading size="md" mb="26px" textAlign="center">
                Medici
              </Heading>
              <SimpleGrid
                gap="10px"
                rowGap="60px"
                gridTemplateColumns={
                  isLargerThan426
                    ? '1fr 1fr 1fr'
                    : isLargerThan728
                    ? '1fr 1fr 1fr 1fr'
                    : '1fr 1fr'
                }
              >
                {medicData?.medic.map((result, index) => {
                  return (
                    <GridItem
                      display="grid"
                      padding="10px"
                      justifyContent="center"
                      textAlign="center"
                      _hover={{
                        boxShadow: '0px 0px 10px -2px #acacac',
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                    >
                      <Image
                        borderRadius="full"
                        objectFit="contain"
                        src=""
                        boxSize="150px"
                        fallbackSrc="https://via.placeholder.com/150"
                      />
                      <Text
                        mt="20px"
                        height="40px"
                        fontSize="18px"
                        _hover={{
                          fontSize: '24px',
                        }}
                      >
                        {result.username}
                      </Text>
                      {!findProf(result.email) ? (
                        <Button
                          children="Alege"
                          onClick={() => handleClick(result.email)}
                          bg={'green'}
                          w="150px"
                          color={'black'}
                          rounded={'md'}
                          _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                          }}
                        />
                      ) : (
                        <></>
                      )}
                    </GridItem>
                  );
                })}
              </SimpleGrid>
            </GridItem>

            <GridItem>
              <Heading size="md" mb="26px" textAlign="center">
                Antrenori fitness
              </Heading>
              <SimpleGrid
                gap="10px"
                rowGap="60px"
                gridTemplateColumns={
                  isLargerThan426
                    ? '1fr 1fr 1fr'
                    : isLargerThan728
                    ? '1fr 1fr 1fr 1fr'
                    : '1fr 1fr'
                }
              >
                {trainnerData?.trainner.map((result, index) => {
                  return (
                    <GridItem
                      display="grid"
                      padding="10px"
                      justifyContent="center"
                      textAlign="center"
                      _hover={{
                        boxShadow: '0px 0px 10px -2px #acacac',
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                    >
                      <Image
                        borderRadius="full"
                        objectFit="contain"
                        src=""
                        boxSize="150px"
                        fallbackSrc="https://via.placeholder.com/150"
                      />
                      <Text
                        mt="20px"
                        height="40px"
                        fontSize="18px"
                        _hover={{
                          fontSize: '24px',
                        }}
                      >
                        {result.username}
                      </Text>
                      {!findProf(result.email) ? (
                        <Button
                          children="Alege"
                          onClick={() => handleClick(result.email)}
                          bg={'green'}
                          w="150px"
                          color={'black'}
                          rounded={'md'}
                          _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                      }}
                        />
                      ) : (
                        <></>
                      )}
                    </GridItem>
                  );
                })}
              </SimpleGrid>
            </GridItem>

            <GridItem>
              <Heading size="md" mb="26px" textAlign="center">
                Nutritionisti
              </Heading>
              <SimpleGrid
                gap="10px"
                rowGap="60px"
                gridTemplateColumns={
                  isLargerThan426
                    ? '1fr 1fr 1fr'
                    : isLargerThan728
                    ? '1fr 1fr 1fr 1fr'
                    : '1fr 1fr'
                }
              >
                {nutritionistData?.nutritionist.map((result, index) => {
                  return (
                    <GridItem
                      display="grid"
                      padding="10px"
                      justifyContent="center"
                      textAlign="center"
                      _hover={{
                        boxShadow: '0px 0px 10px -2px #acacac',
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                    >
                      <Image
                        borderRadius="full"
                        objectFit="contain"
                        src=""
                        boxSize="150px"
                        fallbackSrc="https://via.placeholder.com/150"
                      />
                      <Text
                        mt="20px"
                        height="40px"
                        fontSize="18px"
                        _hover={{
                          fontSize: '24px',
                        }}
                      >
                        {result.username}
                      </Text>
                      {!findProf(result.email) ? (
                        <Button
                          children="Alege"
                          onClick={() => handleClick(result.email)}
                          bg={'green'}
                          w="150px"
                          color={'black'}
                          rounded={'md'}
                          _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                          }}
                        />
                      ) : (
                        <></>
                      )}
                    </GridItem>
                  );
                })}
              </SimpleGrid>
            </GridItem>
            <GridItem>
              <Heading size="md" mb="26px" textAlign="center">
                Psihologi
              </Heading>
              <SimpleGrid
                gap="10px"
                rowGap="60px"
                gridTemplateColumns={
                  isLargerThan426
                    ? '1fr 1fr 1fr'
                    : isLargerThan728
                    ? '1fr 1fr 1fr 1fr'
                    : '1fr 1fr'
                }
              >
                {psihologistData?.psihologist.map((result, index) => {
                  return (
                    <GridItem
                      display="grid"
                      padding="10px"
                      justifyContent="center"
                      textAlign="center"
                      _hover={{
                        boxShadow: '0px 0px 10px -2px #acacac',
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                    >
                      <Image
                        borderRadius="full"
                        objectFit="contain"
                        src=""
                        boxSize="150px"
                        fallbackSrc="https://via.placeholder.com/150"
                      />
                      <Text
                        mt="20px"
                        height="40px"
                        fontSize="18px"
                        _hover={{
                          fontSize: '24px',
                        }}
                      >
                        {result.username}
                      </Text>
                      {!findProf(result.email) ? (
                        <Button
                          children="Alege"
                          onClick={() => handleClick(result.email)}
                          bg={'green'}
                          w="150px"
                          color={'black'}
                          rounded={'md'}
                          _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                          }}
                        />
                      ) : (
                        <></>
                      )}
                    </GridItem>
                  );
                })}
              </SimpleGrid>
            </GridItem>
          </SimpleGrid>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}
