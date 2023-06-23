import React, { useState, useEffect } from 'react';
import { Button, Heading } from '@chakra-ui/react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

import { Container, Stack, Text, Box } from '@chakra-ui/react';

import { CREATE_SUBSCRIPTION } from '../../utils/mutations';

import StripeCheckout from 'react-stripe-checkout';
import ChangeCreditCard from '../../components/ChangeCreditCard';
import CancelSubscription from '../../components/CancelSubscription';

import { SimpleGrid } from '@chakra-ui/react';
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
              'Creaza-ti meniul zilnic, avand acces la o baza mare de alimente',
              'Creaza-ti planul de exercitii',
            ],
          }}
          button={
            <ActionButton>
              <StripeCheckout
                token={token => addSubscription(token, 'monthly')}
                stripeKey="pk_test_51MTrHCL1p6qnKEuvenqU57mxJDfM184hWdgAeXHPRftG3Bz6xVHcxmsw4jkP6gtT5LJVRAkDfIRbG3nfHDpieFCl00sPVjdoUs"
                amount={5000}
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
                amount={420000}
                label="Cumpara acum"
                currency="RON"
              />
            </ActionButton>
          }
        />
      </SimpleGrid>
    </Box>
  ) : (
    <Box display="flex" bg="gray.100">
      <Container maxW={'5xl'} py={12}>
        <Stack
          bg="white"
          border={'1px solid transparent'}
          borderRadius={'8px'}
          boxShadow={'0px 0px 10px -2px #ACACAC'}
          padding="20px"
          mb="60px"
        >
          <Heading size="md" className="sub-heading">
            Cardurile tale
          </Heading>
          <Box display="grid" gap="20px" textAlign="center">
            {currentUser?.ccLast4 ? (
              <>
                <Heading size="sm">
                  Ai un card salvat in procesatorul de plati
                </Heading>
                <Text>
                  Ultimele <b>4 cifre</b> ale cardului tau sunt:{' '}
                  <b>{currentUser?.ccLast4}</b>
                </Text>
                <ChangeCreditCard />
              </>
            ) : (
              <>
                <Heading size="sm">Nu ai nici un card adaugat</Heading>
                <Text>
                  Pentru a putea plati mai usor, adauga cardul tau.Poti oricand
                  sa stergi cardurile din aplicatie.
                </Text>
                <Button children="Adauga un card" />
              </>
            )}
          </Box>
        </Stack>
        <CancelSubscription />
      </Container>
    </Box>
  );
}
