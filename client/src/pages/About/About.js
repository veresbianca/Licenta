import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    ListItem,
    UnorderedList,
} from '@chakra-ui/react';
  
export default function SplitWithImage() {
    return (
      <Container maxW={'5xl'} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Heading>About</Heading>
            <Text color={'black'} fontSize={'lg'}>
              Meet the Team!
            </Text>
{/* Need to add personal statements */}
            <UnorderedList spacing={4} padding={6}>
                <ListItem>Roxana Ionescu: Fitness Trainer & Coach</ListItem>
                <ListItem>Raul Gral: Nutrition Coach and healthy enthusiast</ListItem>
                <ListItem>Mircea Paunescu: medic nutritionist</ListItem>
            </UnorderedList>
          </Stack>
          <Flex>
            <Image
              rounded={'md'}
              alt={'feature image'}
              src={'/working.jpg'}
              objectFit={'cover'}
            />
          </Flex>
        </SimpleGrid>
      </Container>
    );
}