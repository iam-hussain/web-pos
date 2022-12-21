import { gql } from "@apollo/client";

export const USER_DUPLICATE_CHECK = gql`
  query Query($key: UserDuplicateCheck!, $value: String!) {
    userDuplicateCheck(key: $key, value: $value)
  }
`;

export const AUTHENTICATE = gql`
  query Authenticate {
    authenticate {
      hasTokenData
      token
      hasUser
      hasShop
      isPOS
      user {
        id
        firstName
        lastName
        email
        mobileNumber
        hasPasscode
        emailVerified
        updatedAt
        mobileVerified
        createdAt
      }
      shop {
        id
        name
        slug
        slogan
        logo
        mobileNumber
        landlineNumber
        address
        state
        county
        zipCode
        updatedAt
        salaryDate
        createdAt
      }
      shopIds
    }
  }
`;

export const GET_SHOPS_MINI = gql`
  query GetShops {
    getShops {
      id
      name
      slug
      updatedAt
      createdAt
    }
  }
`;

export const GET_SHOP = gql`
  query GetShop($shopId: Int!) {
    getShop(shopId: $shopId) {
      id
      name
      slug
      slogan
      logo
      mobileNumber
      landlineNumber
      address
      county
      state
      zipCode
      salaryDate
      updatedAt
      createdAt
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategories($shopId: Int!) {
    getCategories(shopId: $shopId) {
      id
      title
      updatedAt
      createdAt
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProducts($shopId: Int!) {
    getProducts(shopId: $shopId) {
      id
      title
      price
      category {
        title
        id
      }
      updatedAt
      createdAt
    }
  }
`;
