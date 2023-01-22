import React from 'react';
import { Image } from '@chakra-ui/react';

import CreateExercisePlan from '../../components/CreateExercisePlan';
import ListExercise from '../../components/ListExercise';

import fitnessBanner from '../../assets/images/fitness-banner.webp';

export default function Exercise() {
  return (
    <>
      <Image src={fitnessBanner} width="100%" />
      <ListExercise></ListExercise>
      <CreateExercisePlan></CreateExercisePlan>
    </>
  );
}
