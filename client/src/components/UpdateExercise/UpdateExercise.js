import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_EXERCISE_FROM_ROUTINE } from '../../utils/mutations';
import { Text, Button, Input, Center } from '@chakra-ui/react';

export default function UpdateExercise({ exercise }) {
  const [updateExercise] = useMutation(UPDATE_EXERCISE_FROM_ROUTINE);

  const formik = useFormik({
    initialValues: {
      name: exercise.name,
      type: exercise.type,
      sets: exercise.sets,
      reps: exercise.reps,
      time: exercise.time,
      liftingWeight: exercise.liftingWeight,
      distance: exercise.distance,
      calories: exercise.calories,
      plannedDates: exercise.plannedDates,
    },
    onSubmit: async ({
      name,
      type,
      sets,
      reps,
      time,
      liftingWeight,
      distance,
      calories,
      plannedDates,
    }) => {
      const updatedExercise = await updateExercise({
        variables: {
          id: exercise.id,
          name,
          type,
          sets,
          reps,
          time,
          liftingWeight: parseInt(liftingWeight),
          distance,
          calories,
          plannedDates,
        },
      });
      console.log(updatedExercise);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Text mb="20px">
        nume:{' '}
        <Input
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        ></Input>
      </Text>
      <Text mb="20px">
        tip:{' '}
        <Input
          id="type"
          value={formik.values.type}
          onChange={formik.handleChange}
        ></Input>
      </Text>
      <Text mb="20px">
        seturi:
        <Input
          id="sets"
          type="number"
          value={formik.values.sets}
          onChange={formik.handleChange}
        ></Input>
      </Text>
      <Text mb="20px">
        repetitii:
        <Input
          id="reps"
          type="number"
          value={formik.values.reps}
          onChange={formik.handleChange}
        ></Input>
      </Text>
      <Text mb="20px">
        timp:{' '}
        <Input
          id="time"
          type="number"
          value={formik.values.time}
          onChange={formik.handleChange}
        ></Input>
      </Text>
      <Text mb="20px">
        greutate:{' '}
        <Input
          id="liftingWeight"
          type="number"
          value={formik.values.liftingWeight}
          onChange={formik.handleChange}
        ></Input>
      </Text>
      <Text mb="20px">
        distanta:{' '}
        <Input
          id="distance"
          type="number"
          value={formik.values.distance}
          onChange={formik.handleChange}
        ></Input>
      </Text>
      <Text mb="20px">
        calorii:{' '}
        <Input
          id="calories"
          type="number"
          value={formik.values.calories}
          onChange={formik.handleChange}
        ></Input>
      </Text>
      <Text mb="20px">
        data:{' '}
        <Input
          id="plannedDates"
          type="date"
          value={formik.values.plannedDates}
          onChange={formik.handleChange}
        ></Input>
      </Text>

      <Center>
        <Button 
          type="submit"
          bg={'green'}
          w="250px"
          color={'black'}
          rounded={'md'}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
        >save</Button>
      </Center>
    </form>
  );
}
