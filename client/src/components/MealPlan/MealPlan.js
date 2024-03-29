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
  Text,
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
  Divider,
  GridItem,
} from '@chakra-ui/react';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

import { DateTime } from 'luxon';

const checkDate = dateString => {
  const dateToCompare = DateTime.fromISO(dateString, { zone: "utc" });
  const today = DateTime.local();

  const hasSameDate = dateToCompare.hasSame(today, "day");
  const hasSameMonth = dateToCompare.hasSame(today, "month");
  const hasSameYear = dateToCompare.hasSame(today, "year");

  return hasSameYear && hasSameMonth && hasSameDate;
};

export default function MealPlan() {
  const { loading, error, data } = useQuery(QUERY_ME);
  console.log({ data });

  let breakfast = [];
  let snack = [];
  let dinner = [];
  let lunch = [];

  if (data) {
    data.me.mealPlan.map((meal, index) => {
      if (meal.type.includes('breakfast')) {
        breakfast.push(meal);
      }

      if (meal.type.includes('snack')) {
        snack.push(meal);
      }

      if (meal.type.includes('lunch')) {
        lunch.push(meal);
      }

      if (meal.type.includes('dinner')) {
        dinner.push(meal);
      }
    });
  }

  console.log({ breakfast, snack, lunch, dinner });

  return (
    <>
      <Heading size="lg" children="Acesta este meniul tau de azi" mb="40px" mt="40px" align="center"/>
      <SimpleGrid gap="20px">
        <GridItem
          border="1px solid #0000"
          borderRadius="8px"
          boxShadow="0px 0px 10px -2px #acacac"
        >
          <Stack
              bg="white"
              border={'1px solid transparent'}
              borderRadius={'8px'}
              boxShadow={'0px 0px 10px -2px #ACACAC'}
          >
            <Heading size="md" children="Mic dejun" padding="20px 20px 0" />
            <Center height="50px">
              <Divider />
            </Center>

            <UnorderedList listStyleType="none" margin={0}>
              {breakfast.map((meal, index, { length }) => {
                return checkDate(meal.date) ? (
                  <>
                    <ListItem
                      key={index}
                      display="grid"
                      gap="20px"
                      gridTemplateColumns="90px auto 1fr"
                      alignItems="center"
                      padding="20px"
                    >
                      <Image src={meal.photo} />
                      <Text fontSize="xl">{meal.name}</Text>
                      <Text fontSize="xl" justifySelf="end">
                        {meal.value} {meal.unit}
                      </Text>
                    </ListItem>
                    <Divider display={length - 1 === index ? 'none' : 'block'} />
                  </>
                ) : (
                  <></>
                );
              })}
            </UnorderedList>
          </Stack>
        </GridItem>

        <GridItem
          border="1px solid #0000"
          borderRadius="8px"
          boxShadow="0px 0px 10px -2px #acacac"
        >

          <Stack
              bg="white"
              border={'1px solid transparent'}
              borderRadius={'8px'}
              boxShadow={'0px 0px 10px -2px #ACACAC'}
          >
            <Heading size="md" children="Gustare" padding="20px 20px 0" />
            <Center height="50px">
              <Divider />
            </Center>
            <UnorderedList listStyleType="none" margin={0}>
              {snack.map((meal, index, { length }) => {
                return (
                  <>
                    <ListItem
                      key={index}
                      display="grid"
                      gap="20px"
                      gridTemplateColumns="90px auto 1fr"
                      alignItems="center"
                      padding="20px"
                    >
                      <Image src={meal.photo} />
                      <Text fontSize="xl">{meal.name}</Text>
                      <Text fontSize="xl" justifySelf="end">
                        {meal.value} {meal.unit}
                      </Text>
                    </ListItem>
                    <Divider display={length - 1 === index ? 'none' : 'block'} />
                  </>
                );
              })}
            </UnorderedList>
          </Stack>
        </GridItem>

        <GridItem
          border="1px solid #0000"
          borderRadius="8px"
          boxShadow="0px 0px 10px -2px #acacac"
        >
          <Stack
              bg="white"
              border={'1px solid transparent'}
              borderRadius={'8px'}
              boxShadow={'0px 0px 10px -2px #ACACAC'}
          >
            <Heading size="md" children="Pranz" padding="20px 20px 0" />
            <Center height="50px">
              <Divider />
            </Center>
            <UnorderedList listStyleType="none" margin={0}>
              {lunch.map((meal, index, { length }) => {
                return (
                  <>
                    <ListItem
                      key={index}
                      display="grid"
                      gap="20px"
                      gridTemplateColumns="90px auto 1fr"
                      alignItems="center"
                      padding="20px"
                    >
                      <Image src={meal.photo} />
                      <Text fontSize="xl">{meal.name}</Text>
                      <Text fontSize="xl" justifySelf="end">
                        {meal.value} {meal.unit}
                      </Text>
                    </ListItem>
                    <Divider display={length - 1 === index ? 'none' : 'block'} />
                  </>
                );
              })}
            </UnorderedList>
          </Stack>
        </GridItem>
        <GridItem
          border="1px solid #0000"
          borderRadius="8px"
          boxShadow="0px 0px 10px -2px #acacac"
        >
           <Stack
              bg="white"
              border={'1px solid transparent'}
              borderRadius={'8px'}
              boxShadow={'0px 0px 10px -2px #ACACAC'}
          >
            <Heading size="md" children="Cina" padding="20px 20px 0" />
            <Center height="50px">
              <Divider />
            </Center>
            <UnorderedList listStyleType="none" margin={0}>
              {dinner.map((meal, index, { length }) => {
                return (
                  <>
                    <ListItem
                      key={index}
                      display="grid"
                      gap="20px"
                      gridTemplateColumns="90px auto 1fr"
                      alignItems="center"
                      padding="20px"
                    >
                      <Image src={meal.photo} />
                      <Text fontSize="xl">{meal.name}</Text>
                      <Text fontSize="xl" justifySelf="end">
                        {meal.value} {meal.unit}
                      </Text>
                    </ListItem>
                    <Divider display={length - 1 === index ? 'none' : 'block'} />
                  </>
                );
              })}
            </UnorderedList>
          </Stack>
        </GridItem>
      </SimpleGrid>
    </>
  );
}
