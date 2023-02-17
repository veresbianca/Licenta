import { useState } from 'react';
import { GET_EXERCICES } from '../../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_EXERCISE } from '../../utils/mutations';

import {
  Button,
  Heading,
  Box,
  chakra,
  FormControl,
  Input,
  FormLabel,
  Grid,
  useToast,
} from '@chakra-ui/react';

export default function AddExercise({ exerciseType }) {
  const { data } = useQuery(GET_EXERCICES);
  const [newExerciseToPlan] = useMutation(ADD_EXERCISE);
  const toast = useToast();
  const [reps, setReps] = useState();
  const [setsPerExercise, setSetsPerExercise] = useState();
  const [datePerExercise, setDatePerExercise] = useState();

  const addExercise = async (name, type, reps, sets, date) => {
    console.log({ name });
    // validare pt a adauga acelasi exercitiu o singura data intr-o zi

    await newExerciseToPlan({
      variables: {
        name: name,
        type: type,
        calories: 0,
        distance: 0.0,
        time: '',
        reps: reps,
        sets: sets,
        liftingWeight: 0,
        plannedDates: date,
        new: false,
      },
    });
  };

  const repsChange = event => {
    const { value } = event.target;
    setReps(parseInt(value));
  };

  const setsChange = event => {
    const { value } = event.target;
    setSetsPerExercise(parseInt(value));
  };

  const dateChange = event => {
    const { value } = event.target;
    setDatePerExercise(value);
  };

  return (
    <>
      {data?.exercises.map((exercise, index) => {
        if (exercise.type.includes(`${exerciseType}`)) {
          return (
            <chakra.form
              key={index}
              method="POST"
              onSubmit={e => {
                e.preventDefault();
                return addExercise(
                  exercise.name,
                  exercise.type,
                  reps,
                  setsPerExercise,
                  datePerExercise
                );
              }}
            >
              <Grid
                key={index}
                display="grid"
                justifyContent="space-between"
                gridTemplateColumns="repeat(3, 1fr)"
                gap="30px"
                padding="20px"
                borderBottom="1px solid"
              >
                <Heading size="sm">{exercise.name}</Heading>

                <Box>
                  <FormControl>
                    <FormLabel>Repetări</FormLabel>
                    <Input type="number" onChange={repsChange} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Seturi</FormLabel>
                    <Input type="number" onChange={setsChange} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Dată</FormLabel>
                    <Input type="date" onChange={dateChange} />
                  </FormControl>
                </Box>

                <Button
                  type="submit"
                  children="Adaugă"
                  width="120px"
                  alignSelf="end"
                  justifySelf="center"
                  onClick={() => {
                    toast({
                      duration: 1500,
                      isClosable: true,
                      render: () => (
                        <Box color="white" p={3} bg="blue.500">
                          {exercise.name} adăugat.
                        </Box>
                      ),
                    });
                  }}
                ></Button>
              </Grid>
            </chakra.form>
          );
        }
      })}
    </>
  );
}
