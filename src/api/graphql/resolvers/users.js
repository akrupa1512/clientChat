import { client } from '../apolloConfig';
import { GET_FILTERED_USERS, GET_USER_BY_ID } from "../schemes/users";

export const usersQueries = {
  getAllUsers( { first, offset, filters } ) {
    return client.mutate({
      mutation: GET_FILTERED_USERS,
      variables: {
        first,
        offset,
        filters
      }
    });
  },
	getUserById( id ) {
		return client.query({
			query: GET_USER_BY_ID,
			variables: { id },
			fetchPolicy: 'no-cache'
		});
	}
};
