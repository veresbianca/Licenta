import {
  Heading,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

import AddExercise from '../AddExxercise/AddExercise';

export default function ListExercise() {
  return (
    <Container maxWidth="100vw">
      <Heading
        size="lg"
        children="Please choose from the list of exercises or add a custom exercise"
        paddingBottom="20px"
      ></Heading>
      <Tabs>
        <TabList>
          <Tab>Legs</Tab>
          <Tab>Chest</Tab>
          <Tab>Abs</Tab>
          <Tab>Glutes</Tab>
          <Tab>Biceps</Tab>
          <Tab>Triceps</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AddExercise exerciseType="Legs"></AddExercise>
          </TabPanel>
          <TabPanel>
            <AddExercise exerciseType="Chest"></AddExercise>
          </TabPanel>
          <TabPanel>
            <AddExercise exerciseType="Abs"></AddExercise>
          </TabPanel>
          <TabPanel>
            <AddExercise exerciseType="Glutes"></AddExercise>
          </TabPanel>
          <TabPanel>
            <AddExercise exerciseType="Biceps"></AddExercise>
          </TabPanel>
          <TabPanel>
            <AddExercise exerciseType="Triceps"></AddExercise>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
