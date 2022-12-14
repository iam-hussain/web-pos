import { gql } from "@apollo/client";

export const USER_REGISTER = gql`
  mutation UserRegister(
    $firstName: String!
    $lastName: String!
    $email: String!
    $mobileNumber: String!
    $password: String!
  ) {
    userRegister(
      firstName: $firstName
      lastName: $lastName
      email: $email
      mobileNumber: $mobileNumber
      password: $password
    )
  }
`;

export const USER_LOGIN = gql`
  mutation UserLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password)
  }
`;
