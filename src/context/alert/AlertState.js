import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {

  const initialState = null; // set initial value of state

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type) => {

    //送出 dispatch 顯示 alert 區塊
    dispatch({
      type: SET_ALERT,
      payload: { msg, type }
    });

    //再次送出 dispatch 移除 alert 區塊
    setTimeout(() =>
      dispatch({
        type: REMOVE_ALERT
        // 不需要payload
      }),
      5000);

  };

  return (
    <AlertContext.Provider
      value={{
        alertConfig: state, // the (initial) state of null
        setAlert // method: setAlert
      }}
    >

      {props.children}

    </AlertContext.Provider>
  );
};

export default AlertState;
