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

export const CATEGORY_CREATE = gql`
  mutation CategoryCreate($shopId: Int!, $title: String!) {
    categoryCreate(shopId: $shopId, title: $title) {
      id
    }
  }
`;

export const CATEGORY_UPDATE = gql`
  mutation CategoryUpdate($shopId: Int!, $id: Int!, $title: String!) {
    categoryUpdate(shopId: $shopId, id: $id, title: $title) {
      id
    }
  }
`;

export const CATEGORY_DELETE = gql`
  mutation CategoryDelete($shopId: Int!, $id: Int!) {
    categoryDelete(shopId: $shopId, id: $id)
  }
`;
