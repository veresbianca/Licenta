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
  Input,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_EXERCISE_FROM_ROUTINE } from '../../utils/mutations';

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

  console.log({ exercisePlan });

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
    <Stack>
      <Heading>This is your workout routine!</Heading>
      {exercisePlan !== undefined && exercisePlan.length > 0 ? (
        exercisePlan.map((exercise, index) => {
          return (
            <Box border="1px solid">
              {editMode ? (
                // <form onSubmit={formik.handleSubmit}>
                //   <Text>
                //     name: <Input value={formik.values.name}></Input>
                //   </Text>
                //   <Text>
                //     type: <Input value={formik.values.type}></Input>
                //   </Text>
                //   <Text>
                //     sets:
                //     <Input value={formik.values.sets}></Input>
                //   </Text>
                //   <Text>
                //     reps:
                //     <Input value={formik.values.reps}></Input>
                //   </Text>
                //   <Text>
                //     time: <Input value={formik.values.time}></Input>
                //   </Text>
                //   <Text>
                //     liftingWeight:{' '}
                //     <Input value={formik.values.liftingWeight}></Input>
                //   </Text>
                //   <Text>
                //     distance: <Input value={formik.values.distance}></Input>
                //   </Text>
                //   <Text>
                //     calories: <Input value={formik.values.calories}></Input>
                //   </Text>
                //   <Text>
                //     dates: <Input value={formik.values.plannedDates}></Input>
                //   </Text>

                //   <Button type="submit">save</Button>
                // </form>
                <UpdateExercise exercise={exercise}></UpdateExercise>
              ) : (
                <>
                  <Text>name: {exercise.name}</Text>
                  <Text>type: {exercise.type}</Text>
                  <Text>sets: {exercise.sets}</Text>
                  <Text>reps: {exercise.reps}</Text>
                  <Text>time: {exercise.time}</Text>
                  <Text>liftingWeight: {exercise.liftingWeight}</Text>
                  <Text>distance:{exercise.distance}</Text>
                  <Text>calories:{exercise.calories}</Text>
                  <Text>
                    dates:{' '}
                    {new Date(exercise.plannedDates).toISOString().slice(0, 10)}
                  </Text>
                </>
              )}

              <Button onClick={() => handleRemoveExercise(exercise.id)}>
                Remove exercise from workout
              </Button>

              <Button
                onClick={() => setEditMode(true)}
                display={editMode ? 'none' : 'block'}
              >
                Edit exercise
              </Button>
            </Box>
          );
        })
      ) : (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>you don't have any activity set! </AlertTitle>
        </Alert>
      )}
    </Stack>
  );
}
