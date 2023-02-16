import { Box, useColorModeValue } from '@chakra-ui/react';
import { CardBadge } from '../CardBadge/CardBadge';

export const Card = props => {
  const { children, isPopular, ...rest } = props;
  return (
    <Box
      bg={useColorModeValue('white', 'gray.700')}
      position="relative"
      px="6"
      pb="6"
      pt="16"
      overflow="hidden"
      shadow="lg"
      maxW="md"
      width="100%"
      {...rest}
    >
      {isPopular && <CardBadge>Popular</CardBadge>}
      {children}
    </Box>
  );
};
