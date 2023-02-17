import React, { useState, useEffect } from 'react';
import { Button, Heading } from '@chakra-ui/react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

import { Stack, Text, Box } from '@chakra-ui/react';

import { REMOVE_USER } from '../../utils/mutations';

export default function CancelSubscription() {
  const { loading, error, data: userData } = useQuery(QUERY_ME);
  const [currentUser, setCurrentUser] = useState();
  const [removeUser] = useMutation(REMOVE_USER);

  useEffect(() => {
    if (userData) {
      setCurrentUser(userData.me);
    }
  }, [userData]);

  const sendEmailToRemoveUser = async () => {
    await removeUser({
      variables: { username: currentUser.username },
    });
  };

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
    <Box bg="white">
      <Stack
        bg="white"
        border={'1px solid transparent'}
        borderRadius={'8px'}
        boxShadow={'0px 0px 10px -2px #ACACAC'}
        padding="20px"
        mb="60px"
      >
        <Text mb="20px">
          Anulează subscripția trimițând un email la adresa:
          healthystudio@app.com
        </Text>
        <Button type="button" onClick={() => sendEmailToRemoveUser()}>
          Trimite email
        </Button>
      </Stack>
    </Box>
  );
}
