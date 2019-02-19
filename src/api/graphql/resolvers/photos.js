import { apolloClient } from '../apolloConfig';
import { GET_PHOTO_BY_ID } from '../schemes/photos';

export const photosQueries = {
	getPhotoById( id ) {
		return apolloClient.query({
			query: GET_PHOTO_BY_ID,
			variables: { id },
			fetchPolicy: 'no-cache'
		});
	}
};
