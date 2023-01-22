import React from 'react';
import {
  Box,
  Flex,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { ADD_EXERCISE } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const initialValues = {
  workouts: [
    {
      workout: '',
      reps: '',
      sets: '',
      date: '',
      type: '',
      remember: false,
    },
  ],
};

export default function ExercisePlan() {
  const [addExercise] = useMutation(ADD_EXERCISE);

  const formik = useFormik({
    initialValues: { initialValues },
    onChange: values => {
      console.log({ values });
    },

    onSubmit: async ({ workout, type, reps, sets, date }) => {
      await addExercise({
        variables: {
          name: workout,
          type: type,
          reps: reps,
          sets: sets,
          plannedDates: date,
          new: true,
        },
      });
      formik.values.workout = '';
      formik.values.sets = '';
      formik.values.reps = '';
      formik.values.date = '';
      formik.values.type = '';
    },
  });

  return (
    <>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Text fonstSize={'lg'} color={'gray.600'}>
            If you can't find anything you like, add a custom exercise
          </Text>

          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <form onSubmit={formik.handleSubmit}>
                <FormControl>
                  <FormLabel htmlFor="workout">Workout name</FormLabel>
                  <Input
                    id="workout"
                    name="workout"
                    type="text"
                    variant="filled"
                    // use handlechange, variable name is same as variable above
                    onChange={formik.handleChange}
                    value={formik.values.initialValues.workouts.workout}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="reps">Reps</FormLabel>
                  <Input
                    id="reps"
                    name="reps"
                    type="number"
                    variant="filled"
                    // use handlechange, variable name is same as variable above
                    onChange={formik.handleChange}
                    value={formik.values.initialValues.workouts.reps}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="sets">Sets</FormLabel>
                  <Input
                    id="sets"
                    name="sets"
                    type="number"
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.initialValues.workouts.sets}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="date">Date</FormLabel>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.initialValues.workouts.date}
                  />
                </FormControl>

                <FormControl as="fieldset" margin="20px 0">
                  <Heading size="md" children="Choose workout type" mb="20px" />

                  <RadioGroup
                    name="type"
                    onClick={formik.handleChange}
                    value={formik.values.initialValues.workouts.type}
                  >
                    <Stack spacing="24px" direction="row">
                      <Radio value="Legs">Legs</Radio>
                      <Radio value="Chest">Chest</Radio>
                      <Radio value="Abs">Abs</Radio>
                      <Radio value="Triceps">Triceps</Radio>
                      <Radio value="Biceps">Biceps</Radio>
                      <Radio value="Glutes">Glutes</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>

                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Create Workout
                </Button>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
