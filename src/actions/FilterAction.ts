export const FILTER_BY_NAME = 'FILTER_BY_NAME';
export const LOAD_DATA = 'LOAD_DATA';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const loadDate = (payload: any) => ({
    type: LOAD_DATA,
    payload
}) 

export const filterByName = (payload: any) => ({
    type: FILTER_BY_NAME,
    payload: payload,
 });

 export const requestPosts = () => ({
    type: REQUEST_POSTS,
    });

export const receivedPosts = (json: any) => ({
    type: RECEIVE_POSTS,
    json: json,
    });

 export function fetchUsers() {
    return function (dispatch: any) {
      dispatch(requestPosts());
      return fetch("https://jsonplaceholder.typicode.com/users")
      .then(
         response => response.json(),
         error => console.log('An error occurred.', error),
     )
      .then((json) => {
         dispatch(receivedPosts(json));
      },
     );
    };
   }