import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  login: {
    status: 'INIT'
  },
  register: {
    status: 'INIT'
  },
  status: {
    currentUser: '',
    apiKey:'',
    Id:'',
    Code:''
  } 
};

export default function authentication(state, action) {
  if(typeof state === "undefined") {
    state = initialState;
  }

  switch(action.type) {
  /* LOGIN */
    case types.AUTH_LOGIN:
      return update(state, {
              login: {
                status: { $set: 'WAITING '}
              }
            });
    case types.AUTH_LOGIN_SUCCESS:
      return update(state, {
              login: {
                status: { $set: 'SUCCESS' }
              },
              status:{
                currentUser: { $set: action.user },
                apiKey: { $set: action.api} ,
                Id:{ $set:action.id }
              }
            });
    case types.AUTH_LOGIN_FAILURE:
      return update(state, {
              login: {
                status: { $set: 'FAILURE' }
              },
              status:{
                Code:{$set:action.errorcode}
              }
            });
    case types.AUTH_REGISTER:
      return update(state, {
              register: {
                status: { $set: 'WAITING' }
              }
            });
    case types.AUTH_REGISTER_SUCCESS:
      return update(state, {
              register: {
                status: { $set: 'SUCCESS' }
              },status:{
                Code:{$set:action.errorcode}
              }
            });
    case types.AUTH_REGISTER_FAILURE:
      return update(state, {
              register: {
                status: { $set: 'FAILURE' }
              }
            });
    default:
      return state;  
  }
}
