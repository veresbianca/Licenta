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
  Container,
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
    <Box display="flex" bg="gray.100">
      <Container display="grid" gap="20px" maxW={'5xl'} py={12}>
        <Heading fonstSize={'lg'} align="center" mb="40px">
          Dacă nu găsesți nimic care să îți placă, adaugă un exercițiu nou
        </Heading>

        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl mb="20px">
                <FormLabel htmlFor="workout">Nume</FormLabel>
                <Input
                  id="workout"
                  name="workout"
                  type="text"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.initialValues.workouts.workout}
                />
              </FormControl>
              <FormControl mb="20px">
                <FormLabel htmlFor="reps">Repetări</FormLabel>
                <Input
                  id="reps"
                  name="reps"
                  type="number"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.initialValues.workouts.reps}
                />
              </FormControl>
              <FormControl mb="20px">
                <FormLabel htmlFor="sets">Seturi</FormLabel>
                <Input
                  id="sets"
                  name="sets"
                  type="number"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.initialValues.workouts.sets}
                />
              </FormControl>

              <FormControl mb="40px">
                <FormLabel htmlFor="date">Dată</FormLabel>
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
                <Heading size="md" className="sub-heading" mb="20px">
                  Alege tipul exercițiului
                </Heading>

                <RadioGroup
                  name="type"
                  onClick={formik.handleChange}
                  value={formik.values.initialValues.workouts.type}
                >
                  <Stack spacing="24px" direction="row">
                    <Radio value="Legs">Picioare</Radio>
                    <Radio value="Chest">Piept</Radio>
                    <Radio value="Abs">Abdomen</Radio>
                    <Radio value="Triceps">Triceps</Radio>
                    <Radio value="Biceps">Biceps</Radio>
                    <Radio value="Glutes">Fesieri</Radio>
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
                Crează exercițiu
              </Button>
            </form>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
