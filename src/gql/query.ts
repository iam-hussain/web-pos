import { gql } from "@apollo/client";

export const USER_DUPLICATE_CHECK = gql`
  query Query($key: UserDuplicateCheck!, $value: String!) {
    userDuplicateCheck(key: $key, value: $value)
  }
`;
