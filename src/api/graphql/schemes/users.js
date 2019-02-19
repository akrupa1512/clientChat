import gql from 'graphql-tag';

/********************************************
 *    QUERIES, MUTATIONS FOR USERS ENTITY    *
 * ******************************************/

//********************************** QUERIES **************************************
export const GET_USER_BY_ID = gql`
  query getUserById($id: Int!) {
    getUserById(id: $id) {
			id
			firstName
			lastName
			email
			sex
			profilePicture
			photos {
				url
				id
			}
    }
  }`;


export const GET_FILTERED_USERS = gql`
  mutation getAllUsers($first: Int, $offset: Int, $filters: String) {
    getAllUsers(first: $first, offset: $offset, filters: $filters) {
      users {
        id
        firstName
        lastName
        email
        profilePicture
      }
      total
    }
  }`;
