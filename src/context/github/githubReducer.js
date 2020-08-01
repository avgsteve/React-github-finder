import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';

//接收來自 GithubState.js裡面的的 function 裡面的 dispatch(type: TYPE_NAMES, payload: data) 的內容

// dispatch的內容就會被作為 action 參數傳入 function

export default (state, action) => {
  switch (action.type) { // action.type來自 dispatch 的 type
    case SEARCH_USERS:
      return {
        ...state, // make a copy of current passed-in state
        users: action.payload, //action.payload 來自 dispatch 的 payload: res.data.items
        loading: false // set loading value back to false again
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload, // from searchUsers' dispatch payload:res.data.items
        loading: false
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false
      };
    case GET_REPOS: {
      return {
        ...state,
        repos: action.payload,
        loading: false
      };
    }
    // loading 的狀態 (控制讀取圖片)
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
