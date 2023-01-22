import React, { useState, useEffect } from 'react';
import './style.scss';
import {
  Grid,
  GridItem,
  Heading,
  Stack,
  CircularProgress,
  CircularProgressLabel,
  Progress,
  Text,
} from '@chakra-ui/react';

import { useQuery } from '@apollo/client';

import { QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

function setBMICategory(bmi) {
  let category;
  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = 'Normal Weight';
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = 'Overweight';
  } else {
    category = 'Obese';
  }

  return category;
}

export default function Start() {
  const { data, refetch } = useQuery(QUERY_ME);
  const [bmi, changeBMI] = useState(0);
  const [category, changeCategory] = useState('');
  const [user, setUser] = useState();

  const getTodayExercises = exercisePlan => {
    if (exercisePlan) {
      const result = exercisePlan.filter(checkDate);

      return result;
    }
  };

  const checkDate = exercise => {
    const today = new Date().toISOString().slice(0, 10);
    const arrayOfDates = exercise.plannedDates.map((date, index) => {
      return new Date(date).toISOString().slice(0, 10);
    });

    if (arrayOfDates.includes(today)) {
      return exercise;
    }
  };

  useEffect(() => {
    if (data) {
      setUser(data.me);
      console.log({ data });
    }

    if (user) {
      changeBMI(user.bmi);
      changeCategory(setBMICategory(user.bmi));
    }

    refetch();
  }, [data, refetch, user]);

  return (
    <>
      <Grid
        gridTemplateColumns={'1fr 1fr'}
        gridTemplateRows={'1fr 1fr 1fr 1fr'}
      >
        {Auth.loggedIn() ? (
          <>
            <GridItem className="full-width-gridItem">
              <Stack>
                <Heading>Overview</Heading>
                <div className="card-container">
                  <div className="card-wrapper">
                    <Heading size={'xs'}>Body Mass Index (BMI)</Heading>
                    <CircularProgress
                      value={bmi ? bmi : ''}
                      color="green"
                      size={'160px'}
                    >
                      <CircularProgressLabel>
                        {bmi ? bmi : ''} BMI
                      </CircularProgressLabel>
                    </CircularProgress>
                    <Heading size={'xs'}>Your BMI:</Heading>
                    <Heading size={'xs'}>{category}</Heading>
                  </div>
                  <div className="card-wrapper">
                    <Heading size={'xs'}>Calorie Intake (per day)</Heading>
                  </div>
                  <div className="card-wrapper">
                    <Heading size={'xs'}>Daily steps</Heading>
                  </div>
                  <div className="card-wrapper">
                    <Heading size={'xs'}>Macronutrient Ratios</Heading>
                    <p>
                      Carbohidrati: {user?.stats ? user?.stats[0]?.carbs : ''}
                    </p>
                    <Progress value={80} colorScheme="orange" size="sm" />

                    <p>
                      Proteine: {user?.stats ? user?.stats[0]?.protein : ''}
                    </p>
                    <Progress value={20} colorScheme="blue" size="sm" />

                    <p>Lipide: {user?.stats ? user?.stats[0]?.fats : ''}</p>
                    <Progress value={45} colorScheme="pink" size="sm" />
                  </div>
                </div>
              </Stack>
            </GridItem>
            <GridItem>
              <Stack>
                <Heading>Today's activity</Heading>
                <div className="card-container">
                  {user
                    ? getTodayExercises(user.exercisePlan).map(
                        (exercise, index) => {
                          console.log({ exercise });
                          return (
                            <Stack border="1px solid">
                              <Text>{exercise.name}</Text>
                              <Text>{exercise.type}</Text>
                              <Text>{exercise.reps}</Text>
                              <Text>{exercise.sets}</Text>
                            </Stack>
                          );
                        }
                      )
                    : null}
                </div>
              </Stack>
            </GridItem>
            <GridItem>
              <Stack>
                <Heading>Recommended activity</Heading>
                <div className="card-container">ccccc</div>
              </Stack>
            </GridItem>
            <GridItem>
              <Stack>
                <Heading>Popular Trainers</Heading>
                <div className="card-container">dddd</div>
              </Stack>
            </GridItem>
            <GridItem>
              <Stack>
                <Heading>Work with a professional</Heading>
                <div className="card-container">eeeee</div>
              </Stack>
            </GridItem>
            <GridItem>
              <Stack>
                <Heading>Goals</Heading>
                <div className="card-container">fffff</div>
              </Stack>
            </GridItem>
          </>
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
}
