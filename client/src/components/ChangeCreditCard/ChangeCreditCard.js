import React, { useState, useEffect } from 'react';
import { Button, Heading } from '@chakra-ui/react';
import { useLazyQuery } from '@apollo/client';
import { CHECKOUT } from '../../utils/queries';
import { useQuery, gql, useMutation } from '@apollo/client';
import httpClient from 'react-http-client';
import { QUERY_ME } from '../../utils/queries';

import { Container, Text } from '@chakra-ui/react';

import { CHANGE_CREDIT_CARD } from '../../utils/mutations';

import StripeCheckout from 'react-stripe-checkout';

export default function ChangeCreditCard() {
  const [updateCreditCard] = useMutation(CHANGE_CREDIT_CARD);
  const { loading, error, data: userData } = useQuery(QUERY_ME);
  const [currentUser, setCurrentUser] = useState();

  const updateStripeCard = async token => {
    const response = await updateCreditCard({
      variables: { source: token.id, ccLast4: token.card.last4 },
    });

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
  //         />
  //       );
  //     } else {
  //       return (
  //         <Text>
  //           {`${currentUser?.username} has a ${currentUser?.userType} subscription`}
  //         </Text>
  //       );
  //     }
  //   };

  return (
    <Container>
      <StripeCheckout
        label="change credit card"
        token={token => updateStripeCard(token)}
        stripeKey="pk_test_51MTrHCL1p6qnKEuvenqU57mxJDfM184hWdgAeXHPRftG3Bz6xVHcxmsw4jkP6gtT5LJVRAkDfIRbG3nfHDpieFCl00sPVjdoUs"
      />
    </Container>
  );
}
