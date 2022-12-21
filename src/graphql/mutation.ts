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

export const PRODUCT_CREATE = gql`
  mutation ProductCreate(
    $shopId: Int!
    $title: String!
    $price: Float!
    $categoryId: Int!
  ) {
    productCreate(
      shopId: $shopId
      title: $title
      price: $price
      categoryId: $categoryId
    ) {
      id
    }
  }
`;

export const PRODUCT_UPDATE = gql`
  mutation ProductUpdate(
    $shopId: Int!
    $id: Int!
    $title: String!
    $price: Float!
    $categoryId: Int!
  ) {
    productUpdate(
      shopId: $shopId
      id: $id
      title: $title
      price: $price
      categoryId: $categoryId
    ) {
      id
    }
  }
`;

export const PRODUCT_DELETE = gql`
  mutation ProductDelete($shopId: Int!, $id: Int!) {
    productDelete(shopId: $shopId, id: $id)
  }
`;
