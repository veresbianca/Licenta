import React, { useState, useEffect } from 'react';
import { Button, Heading } from '@chakra-ui/react';
import { useLazyQuery } from '@apollo/client';
import { CHECKOUT } from '../../utils/queries';
import { useQuery, gql, useMutation } from '@apollo/client';
import httpClient from 'react-http-client';
import { QUERY_ME } from '../../utils/queries';

import { Container, Text, Box } from '@chakra-ui/react';

import { CREATE_SUBSCRIPTION } from '../../utils/mutations';

import StripeCheckout from 'react-stripe-checkout';
import ChangeCreditCard from '../../components/ChangeCreditCard';
import CancelSubscription from '../../components/CancelSubscription';

import { SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { SiHive, SiMarketo, SiMicrosoft } from 'react-icons/si';
import { ActionButton } from '../../components/ActionButton/ActionButton';
import { PricingCard } from '../../components/PricingCard/PricingCard';

export default function Subscription() {
  const [newSubscription] = useMutation(CREATE_SUBSCRIPTION);
  const { loading, error, data: userData } = useQuery(QUERY_ME);
  const [currentUser, setCurrentUser] = useState();

  const addSubscription = async (token, type) => {
    const response = await newSubscription({
      variables: { source: token.id, ccLast4: token.card.last4, type: type },
    });

    console.log(response);
  };

  useEffect(() => {
    if (userData) {
      setCurrentUser(userData.me);
    }
  }, [userData]);

  // const renderPage = () => {
  //   if (currentUser?.userType === 'free-trial') {
  //     return (
  //       <StripeCheckout
  //         token={token => addSubscription(token)}
  //         stripeKey="pk_test_51MTrHCL1p6qnKEuvenqU57mxJDfM184hWdgAeXHPRftG3Bz6xVHcxmsw4jkP6gtT5LJVRAkDfIRbG3nfHDpieFCl00sPVjdoUs"
  //         amount={4999.99}
  //         currency="RON"
  //       />
  //     );
  //   } else {
  //   }
  // };

  return currentUser?.userType === 'free-trial' ? (
    <Box
      as="section"
      py="14"
      px={{
        base: '4',
        md: '8',
      }}
    >
      <SimpleGrid
        columns={{
          base: 1,
          lg: 2,
        }}
        spacing={{
          base: '8',
          lg: '0',
        }}
        maxW="7xl"
        mx="auto"
        justifyItems="center"
        alignItems="center"
      >
        <PricingCard
          data={{
            price: '50 lei',
            type: 'luna',
            name: 'Incepator',
            features: [
              'Functionalitate de adaugare meniu',
              'Functionalitate de adaugare exercitii',
            ],
          }}
          button={
            <ActionButton variant="outline" borderWidth="2px">
              <StripeCheckout
                token={token => addSubscription(token, 'monthly')}
                stripeKey="pk_test_51MTrHCL1p6qnKEuvenqU57mxJDfM184hWdgAeXHPRftG3Bz6xVHcxmsw4jkP6gtT5LJVRAkDfIRbG3nfHDpieFCl00sPVjdoUs"
                amount={50}
                label="Cumpara acum"
                currency="RON"
              />
            </ActionButton>
          }
        />

        <PricingCard
          zIndex={1}
          isPopular
          transform={{
            lg: 'scale(1.05)',
          }}
          data={{
            price: '4200 lei',
            type: 'an',
            name: 'Profi',
            features: [
              'Acces la toate functionalitatile din aplcatie',
              'Acces la noutati cu prioritate',
            ],
          }}
          button={
            <ActionButton>
              <StripeCheckout
                token={token => addSubscription(token, 'yearly')}
                stripeKey="pk_test_51MTrHCL1p6qnKEuvenqU57mxJDfM184hWdgAeXHPRftG3Bz6xVHcxmsw4jkP6gtT5LJVRAkDfIRbG3nfHDpieFCl00sPVjdoUs"
                amount={4200}
                label="Cumpara acum"
                currency="RON"
              />
            </ActionButton>
          }
        />
      </SimpleGrid>
    </Box>
  ) : (
    <Box>
      <ChangeCreditCard />
      <CancelSubscription />
    </Box>
  );
}
