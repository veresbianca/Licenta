import React, { useState, useEffect } from 'react';
import { Button, Heading } from '@chakra-ui/react';
import { useLazyQuery } from '@apollo/client';
import { CHECKOUT } from '../../utils/queries';
import { useQuery, gql, useMutation } from '@apollo/client';
import httpClient from 'react-http-client';
import { QUERY_ME } from '../../utils/queries';

import { Container, Text, Box } from '@chakra-ui/react';

import { CANCEL_SUBSCRIPTION } from '../../utils/mutations';

export default function CancelSubscription() {
  const [cancelSubscription] = useMutation(CANCEL_SUBSCRIPTION);
  const { loading, error, data: userData } = useQuery(QUERY_ME);
  const [currentUser, setCurrentUser] = useState();

  const cancelUserSubscription = async () => {
    const response = await cancelSubscription();

    console.log(response);
  };

  useEffect(() => {
    if (userData) {
      setCurrentUser(userData.me);
    }
  }, [userData]);

  //   const renderPage = () => {
  //     if (currentUser?.userType === 'free-trial') {
  //       return (
  //         <StripeCheckout
  //           token={token => addSubscription(token)}
  //           stripeKey="pk_test_51MTrHCL1p6qnKEuvenqU57mxJDfM184hWdgAeXHPRftG3Bz6xVHcxmsw4jkP6gtT5LJVRAkDfIRbG3nfHDpieFCl00sPVjdoUs"
  //           amount={4999.99}
  //           currency="RON"
  //         />
  //       );
  //     } else {
  //       return (
  //         <Box>
  //           <Text>last 4 digits of your credit card: {currentUser?.ccLast4}</Text>
  //           <ChangeCreditCard />
  //           {/* {`${currentUser?.username} has a ${currentUser?.userType} subscription`} */}
  //         </Box>
  //       );
  //     }
  //   };

  return (
    <Container>
      <Button onClick={() => cancelUserSubscription()}>
        cancel subscription
      </Button>
    </Container>
  );
}
