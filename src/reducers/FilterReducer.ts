import {UserDetails} from '../Mapper/UserDetails';
import {REQUEST_POSTS, RECEIVE_POSTS, FILTER_BY_NAME, LOAD_DATA} from '../actions/FilterAction';

export interface UserState {
    users: UserDetails[];
    filteredUsers : UserDetails[];
    appliedFilters: string[];
    loading: boolean;
}

const initialState: UserState = {
    users: [],
    filteredUsers: [],
    appliedFilters: [],
    loading: false
};

const filterStore = (state = initialState, action: any) => {
   switch (action.type) {
        case LOAD_DATA: 
        return {
            ...state,
            users: action.payload.value,
        };

       case FILTER_BY_NAME:
        let newState = Object.assign({}, state);
        let value = action.payload;
        let filteredValues = state.users.filter(user => {
            return user.name.toLowerCase().includes(value);
        });
        let appliedFilters = state.appliedFilters;
        if (value) {
            let index = appliedFilters.indexOf(FILTER_BY_NAME);
            if (index===-1)
                appliedFilters.push(FILTER_BY_NAME);
            newState.filteredUsers = filteredValues;
        } else {
            let index = appliedFilters.indexOf(FILTER_BY_NAME);
            appliedFilters.splice(index, 1);
            if (appliedFilters.length === 0) {
                newState.filteredUsers = newState.users;
            }
        }
        return newState;
    
        case REQUEST_POSTS:
       return { ...state, loading: true };

        case RECEIVE_POSTS:
       return { ...state, users: action.json, filteredUsers:action.json, loading: false };

       default:
           return state;
   }
};
export default filterStore;