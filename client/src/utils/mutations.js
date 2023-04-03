import { gql } from '@apollo/client';

export const SAVE_BOOK = gql`
  mutation saveBook($bookDetails: saveBookVariables!) {
    saveBook(bookDetails: $bookDetails) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;