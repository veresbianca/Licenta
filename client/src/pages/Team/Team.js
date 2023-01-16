import React from 'react';
import {
  GridItem,
  Container,
  SimpleGrid,
  Heading,
  Image,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { GET_PROF } from '../../utils/queries';
import { useQuery } from '@apollo/client';

export default function Team() {
  const { loading, error, data } = useQuery(GET_PROF);
  const [isLargerThan426] = useMediaQuery('(min-width: 426px)');
  const [isLargerThan728] = useMediaQuery('(min-width: 728px)');
  const [isLargerThan1025] = useMediaQuery('(min-width: 1025px)');

  let medics = [];
  let nutritionists = [];
  let trainners = [];

  if (data) {
    data.profesionalist.map((prof, index) => {
      if (prof.type === 'medic') {
        medics.push(prof);
      }
      if (prof.type === 'nutritionist') {
        nutritionists.push(prof);
      }

      if (prof.type === 'trainner') {
        trainners.push(prof);
      }
    });
  }

  console.log({ data });

  return (
    <Container maxW={'5xl'} py={12}>
      <Heading
        textAlign="center"
        size="lg"
        mb="60px"
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
            {medics.map((result, index) => {
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
                    src={`/Medici/${result.photoSrc}.jpg`}
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
                    {result.name}
                  </Text>
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
            {trainners.map((result, index) => {
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
                    src={`/Traineri/${result.photoSrc}.jpg`}
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
                    {result.name}
                  </Text>
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
            {nutritionists.map((result, index) => {
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
                    src={`/Nutritionisti/${result.photoSrc}.jpg`}
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
                    {result.name}
                  </Text>
                </GridItem>
              );
            })}
          </SimpleGrid>
        </GridItem>
      </SimpleGrid>
    </Container>
  );
}
