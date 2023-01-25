import { gql } from '@apollo/client';

export const userFragment = gql`
  fragment UserInfo on User {
    id
    username
    email
    userType
    ccLast4
  }
`;
