import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE
} from './ActionTypes';
import axios from 'axios';
import config from '../config';

export function loginRequest(username, password) {
  return (dispatch) => {
    dispatch(login());
      return axios.post(config.URL+'users/login', { 
              email: username, 
              password:password 
              }).then((response) => {
                dispatch(loginSuccess(
                  response.data.data.email,
                  response.data.data.APIKEY, 
                  response.data.data.id
                ))
              }).catch((error) => {
                dispatch(loginFailure(error.response.status));
            });
  };
}

export function login() {
  return {
    type: AUTH_LOGIN
  };
}

export function loginSuccess(user,api,id,message) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    user,
    api,
    id
  };
}

export function loginFailure(errorcode) {
  return {
    type: AUTH_LOGIN_FAILURE,
    errorcode
  };
}

export function registerRequest(username, password, source) {
  return (dispatch) => {
      // inform register API is starting
    dispatch(register());
    return axios.post(config.URL+'users/', { 
          email: username, 
          password: password,
          source: source
      })
      .then((reponse) => {
        dispatch(registerSuccess());
      }).catch((error) => {
        dispatch(registerFailure(error.response.status));
        console.log(error.response.status+"#####")
      });
  };
}

export function register() {
  return {
    type: AUTH_REGISTER
  };
}

export function registerSuccess() {
  return {
    type: AUTH_REGISTER_SUCCESS
  };
}

export function registerFailure(errorcode) {
  return {
    type: AUTH_REGISTER_FAILURE,
    errorcode
  };
}