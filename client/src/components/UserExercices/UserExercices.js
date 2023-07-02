import { QUERY_ME } from '../../utils/queries';
import {
  Stack,
  Heading,
  Box,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Container,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_EXERCISE_FROM_ROUTINE } from '../../utils/mutations';
import dayjs from "dayjs";

import UpdateExercise from '../UpdateExercise';

export default function UserExercices() {
  const { data } = useQuery(QUERY_ME);
  const [exercisePlan, setExercisePlan] = useState();
  const [remmoveExerciseFromRoutine] = useMutation(
    REMOVE_EXERCISE_FROM_ROUTINE
  );

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (data) {
      setExercisePlan(data.me.exercisePlan);
      console.log({ data });
    }
  }, [data, exercisePlan]);


  const handleRemoveExercise = async id => {
    try {
      const removeExercise = await remmoveExerciseFromRoutine({
        variables: {
          id: id,
        },
      });
      console.log(removeExercise);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box display="flex" bg="gray.100">
      <Container display="grid" gap="20px" maxW={'5xl'} py={12}>
        <Heading mb="40px" align="center">Aceasta este rutina ta de exercitii!</Heading>

        <Tabs>
          <TabList>
            {exercisePlan !== undefined && exercisePlan.length > 0 ? (
              exercisePlan.map((exercise, index) => {
                return (<Tab>{dayjs(exercise.plannedDates[0]).format("MM/DD/YY")}</Tab>) })
                ): (<div></div>)}
          </TabList>

          <TabPanels>
            {exercisePlan !== undefined && exercisePlan.length > 0 ? (
            exercisePlan.map((exercise, index) => {
              return (
                <TabPanel>
                <Stack
                  bg="white"
                  border={'1px solid transparent'}
                  borderRadius={'8px'}
                  boxShadow={'0px 0px 10px -2px #ACACAC'}
                  padding="20px"
                >
              {editMode ? (
                <UpdateExercise exercise={exercise}></UpdateExercise>
              ) : (
                <>
                  <Heading size="sm">{exercise.name}</Heading>

                  <Box display="grid" gridTemplateColumns="repeat(2, 1fr)">
                    <Box
                      display="grid"
                      gridTemplateColumns="auto 1fr"
                      alignItems="center"
                    >
                      <Heading size="sm">Tip:</Heading>
                      <span>{exercise.type}</span>
                    </Box>
                    <Box
                      display="grid"
                      gridTemplateColumns="auto 1fr"
                      alignItems="center"
                    >
                      <Heading size="sm">Seturi:</Heading>
                      <span>{exercise.sets}</span>
                    </Box>
                    <Box
                      display="grid"
                      gridTemplateColumns="auto 1fr"
                      alignItems="center"
                    >
                      <Heading size="sm">Repetări:</Heading>
                      <span>{exercise.reps}</span>
                    </Box>
                    <Box
                      display="grid"
                      gridTemplateColumns="auto 1fr"
                      alignItems="center"
                    >
                      <Heading size="sm">Timp:</Heading>
                      <span>{exercise.time}</span>
                    </Box>
                    <Box
                      display="grid"
                      gridTemplateColumns="auto 1fr"
                      alignItems="center"
                    >
                      <Heading size="sm">Greutate:</Heading>
                      <span>{exercise.liftingWeight}</span>
                    </Box>
                    <Box
                      display="grid"
                      gridTemplateColumns="auto 1fr"
                      alignItems="center"
                    >
                      <Heading size="sm">Dsitanță:</Heading>
                      <span>{exercise.distance}</span>
                    </Box>
                    <Box
                      display="grid"
                      gridTemplateColumns="auto 1fr"
                      alignItems="center"
                    >
                      <Heading size="sm">Calorii:</Heading>
                      <span>{exercise.calories}</span>
                    </Box>
                    <Box
                      display="grid"
                      gridTemplateColumns="auto 1fr"
                      alignItems="center"
                    >
                      <Heading size="sm">Date:</Heading>
                      <span>
                        {new Date(exercise.plannedDates)
                          .toISOString()
                          .slice(0, 10)}
                      </span>
                    </Box>
                  </Box>
                  <Box
                    display="grid"
                    gridTemplateColumns="1fr 1fr"
                    gap="20px"
                    mt="20px"
                  >
                    <Button onClick={() => handleRemoveExercise(exercise.id)}>
                      Sterge
                    </Button>

                    <Button
                      onClick={() => setEditMode(true)}
                      display={editMode ? 'none' : 'block'}
                    >
                      Editează
                    </Button>
                  </Box>
                </>
              )}
            </Stack></TabPanel>) })
              ): (<Alert status="error">
              <AlertIcon />
              <AlertTitle>Nu ai adăugat nici un exercițiu! </AlertTitle>
            </Alert>)}
          </TabPanels>
        </Tabs>
        
      </Container>
    </Box>
  );
}
