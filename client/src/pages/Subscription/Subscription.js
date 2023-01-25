import React, { useState, useEffect } from 'react';
import { Button, Heading } from '@chakra-ui/react';
import { useLazyQuery } from '@apollo/client';
import { CHECKOUT } from '../../utils/queries';
import { useQuery, gql, useMutation } from '@apollo/client';
import httpClient from 'react-http-client';
import { CREATE_SUBSCRIPTION } from '../../utils/mutations';

import StripeCheckout from 'react-stripe-checkout';

export default function Subscription() {
  const [newSubscription] = useMutation(CREATE_SUBSCRIPTION);

  // onToken = token => {
  //   fetch('/save-stripe-token', {
  //     method: 'POST',
  //     body: JSON.stringify(token),
  //   }).then(response => {
  //     response.json().then(data => {
  //       alert(`We are in business, ${data.email}`);
  //     });
  //   });
  // };

  const addSubscription = async token => {
    const response = await newSubscription({
      variables: { source: token.id },
    });

    console.log(response);
  };

  return (
    <>
      <StripeCheckout
        token={token => addSubscription(token)}
        stripeKey="pk_test_51MTrHCL1p6qnKEuvenqU57mxJDfM184hWdgAeXHPRftG3Bz6xVHcxmsw4jkP6gtT5LJVRAkDfIRbG3nfHDpieFCl00sPVjdoUs"
      />
    </>
  );

  // export default function Subscription() {
  // const [startCheckout, loading, error, data] = useLazyQuery(CHECKOUT, {
  //   onCompleted: queryData => {
  //     console.log(queryData);

  //     let data = JSON.parse(queryData.createCheckoutSession);
  //     console.log(data);

  //     let checkoutUrl = data.url;
  //     window.location.assign(checkoutUrl);
  //   },
  // });

  // if (loading) {
  //   console.log('loading');
  //   return null;
  // }
  // if (error) return `Error ${error}`;
  // console.log(data);

  // return (
  //   <>
  //     <Heading>Subscribe to a plan!</Heading>
  //     <Button onClick={() => startCheckout()}>Checkout</Button>
  //   </>
  // );
}
