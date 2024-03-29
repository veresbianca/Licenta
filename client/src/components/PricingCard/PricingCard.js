import {
  Flex,
  Heading,
  Icon,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { HiCheckCircle } from 'react-icons/hi';
import { Card } from '../Card/Card';

export const PricingCard = props => {
  const { data, icon, button, ...rest } = props;
  const { features, price, name, type } = data;
  const accentColor = useColorModeValue('blue.600', 'blue.200');
  return (
    <Card
      rounded={{
        sm: 'xl',
      }}
      {...rest}
    >
      <VStack spacing={6}>
        <Heading size="md" fontWeight="extrabold">
          {name}
        </Heading>
      </VStack>
      <Flex
        align="flex-end"
        justify="center"
        fontWeight="extrabold"
        color={accentColor}
        my="8"
      >
        <Heading size="3xl" fontWeight="inherit" lineHeight="0.9em">
          {price}
        </Heading>
        <Text fontWeight="inherit" fontSize="2xl">
          / {type}
        </Text>
      </Flex>
      <List spacing="4" mb="8" maxW="28ch" mx="auto">
        {features.map((feature, index) => (
          <ListItem fontWeight="medium" key={index}>
            <ListIcon
              fontSize="xl"
              as={HiCheckCircle}
              marginEnd={2}
              color={accentColor}
            />
            {feature}
          </ListItem>
        ))}
      </List>
      {button}
    </Card>
  );
};
