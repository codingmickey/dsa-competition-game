import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import userRegisterReducer, {
  userLoginReducer,
} from './reducers/userReducers';
import userInfo from './reducers/userInfoReducer';
import {
  createRoom,
  joinRoom,
  roomInfo,
  joinRoomCode,
  admin,
} from './reducers/roomReducer';
import { gameInfo } from './reducers/gameReducer';

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userInfo,
  createRoom,
  joinRoom,
  roomInfo,
  joinRoomCode,
  admin,
  gameInfo,
});

// const userInfoFromStorage = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo'))
//   : null;

// const initialState = {
//   userLogin: { userInfo: userInfoFromStorage },
// };

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
