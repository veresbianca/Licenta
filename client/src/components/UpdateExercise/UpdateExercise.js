import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_EXERCISE_FROM_ROUTINE } from '../../utils/mutations';
import { Text, Button, Input } from '@chakra-ui/react';

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
      <Text>
        name:{' '}
        <Input
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        ></Input>
      </Text>
      <Text>
        type:{' '}
        <Input
          id="type"
          value={formik.values.type}
          onChange={formik.handleChange}
        ></Input>
      </Text>
      <Text>
        sets:
        <Input
          id="sets"
          type="number"
          value={formik.values.sets}
          onChange={formik.handleChange}
        ></Input>
      </Text>
      <Text>
        reps:
        <Input
          id="reps"
          type="number"
          value={formik.values.reps}
          onChange={formik.handleChange}
        ></Input>
      </Text>
      <Text>
        time:{' '}
        <Input
          id="time"
          type="number"
          value={formik.values.time}
          onChange={formik.handleChange}
        ></Input>
      </Text>
      <Text>
        liftingWeight:{' '}
        <Input
          id="liftingWeight"
          type="number"
          value={formik.values.liftingWeight}
          onChange={formik.handleChange}
        ></Input>
      </Text>
      <Text>
        distance:{' '}
        <Input
          id="distance"
          type="number"
          value={formik.values.distance}
          onChange={formik.handleChange}
        ></Input>
      </Text>
      <Text>
        calories:{' '}
        <Input
          id="calories"
          type="number"
          value={formik.values.calories}
          onChange={formik.handleChange}
        ></Input>
      </Text>
      <Text>
        dates:{' '}
        <Input
          id="plannedDates"
          type="date"
          value={formik.values.plannedDates}
          onChange={formik.handleChange}
        ></Input>
      </Text>

      <Button type="submit">save</Button>
    </form>
  );
}
