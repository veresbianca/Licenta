import React from 'react';
import {
  Box,
  Heading,
  Container,
  Image,
  OrderedList,
  ListItem,
  Center,
  UnorderedList,
  Text,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

import homeBanner from '../../assets/images/64671.jpg';

export default function Home() {
  return (
    <Box display="flex">
      <Container display="grid" gap="20px" maxW={'5xl'} py={12}>
        <Image src={homeBanner} objectFit="cover" />
        <Heading align="center" mb="100px" mt="100px">
          Nutriție - Antrenament - Coaching - Comunitate
        </Heading>
        <Center>
          <UnorderedList styleType="none">
            <ListItem display="flex" alignItems="center">
              <CheckIcon mr="10px"></CheckIcon>
              <Text fontSize={'2xl'}>Comunitate</Text>
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <CheckIcon mr="10px"></CheckIcon>
              <Text fontSize={'2xl'}>Specialiști</Text>
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <CheckIcon mr="10px"></CheckIcon>
              <Text fontSize={'2xl'}>Plan alimentar</Text>
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <CheckIcon mr="10px"></CheckIcon>
              <Text fontSize={'2xl'}>Plan de antrenament</Text>
            </ListItem>
          </UnorderedList>
        </Center>
      </Container>
    </Box>
  );
}
