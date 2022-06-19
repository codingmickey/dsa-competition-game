import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import userRegisterReducer, { userLoginReducer } from './reducers/userReducers';
import userInfo from './reducers/userInfoReducer';
import {
  createRoom,
  joinRoom,
  roomInfo,
  joinRoomCode,
  admin,
} from './reducers/roomReducer';

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userInfo,
  createRoom,
  joinRoom,
  roomInfo,
  joinRoomCode,
  admin,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
