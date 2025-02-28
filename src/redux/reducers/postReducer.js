import { FETCH_USER_POST } from "../types/post";

const initialState = {
    posts: [],
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER_POST:
        return {
          ...state,
          posts: action.payload,
        };
      default:
        return state;
    }
};

export default postReducer;