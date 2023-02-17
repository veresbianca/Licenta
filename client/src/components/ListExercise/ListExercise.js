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
        children="Alege din lista de exerciții de mai jos sau crează un exercițiu nou"
        paddingBottom="20px"
      ></Heading>
      <Tabs>
        <TabList>
          <Tab>Picioare</Tab>
          <Tab>Piept</Tab>
          <Tab>Abdomen</Tab>
          <Tab>Fesieri</Tab>
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
