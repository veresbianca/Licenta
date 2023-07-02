import {
  Heading,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Stack
} from '@chakra-ui/react';

import AddExercise from '../AddExxercise/AddExercise';

export default function ListExercise() {
  return (
    <Box display="flex" bg="gray.100">
        <Container display="grid" gap="20px" maxW={'5xl'} py={12}>
          <Heading
            size="lg"
            align="center"
            children="Alege din lista de exerciții de mai jos sau crează un exercițiu nou"
            mb="40px"
          ></Heading>
          <Stack
            bg="white"
            border={'1px solid transparent'}
            borderRadius={'8px'}
            boxShadow={'0px 0px 10px -2px #ACACAC'}
            padding="20px"
          >
            <Tabs>
              <TabList>
                <Tab>
                  <Heading size="md" className="sub-heading">
                    Picioare
                  </Heading>
                </Tab>
                <Tab>
                  <Heading size="md" className="sub-heading">
                    Piept
                  </Heading>
                </Tab>
                <Tab>
                  <Heading size="md" className="sub-heading">
                    Abdomen
                  </Heading>
                </Tab>
                <Tab>
                  <Heading size="md" className="sub-heading">
                    Fesieri
                  </Heading>
                </Tab>
                <Tab>
                  <Heading size="md" className="sub-heading">
                    Biceps
                  </Heading>
                </Tab>
                <Tab>
                  <Heading size="md" className="sub-heading">
                    Triceps
                  </Heading>
                </Tab>
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
          </Stack>
      
        </Container>
      </Box>
    
  );
}
