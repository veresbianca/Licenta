import { Button } from '@chakra-ui/react';

export const ActionButton = props => (
  <Button
    colorScheme="green"
    size="lg"
    w="full"
    fontWeight="extrabold"
    py={{
      md: '8',
    }}
    {...props}
  />
);
