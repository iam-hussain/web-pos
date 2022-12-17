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

export const GET_SHOP_FOR_TABLE = gql`
  query GetShop {
    getShops {
      id
      name
      slug
      salaryDate
      updatedAt
      createdAt
    }
  }
`;
