import gql from 'graphql-tag';

export const GET_PHOTO_BY_ID = gql`
  query getPhotoById($id: Int!) {
    getPhotoById(id: $id) {
			id
			url
			userId
			createdAt
			comments {
				id
				message
				photoId
				user {
					id
					firstName
					lastName
					profilePicture
				} 
				createdAt
			}
    }
  }`;

export const ADD_COMMENT_BY_PHOTO_ID = gql`
  mutation createComment($message: String!, $photoId: Int!, $userId: Int!) {
		createComment(message: $message, photoId: $photoId, userId: $userId) {
			id
            message
            photoId
            user {
                id
                firstName
                lastName
                profilePicture
            }
            createdAt
		}
	}`;
