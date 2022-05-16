import axios from 'axios';
axios.defaults.baseURL = 'http://dsa-competition-app.herokuapp.com/';

export const register =
  (username, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: 'USER_REGISTER_REQUEST',
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/user/register',
        { username, email, password },
        config,
      );

      dispatch({
        type: 'USER_REGISTER_SUCCESS',
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'USER_REGISTER_FAIL',
        payload: error.response.data,
      });
    }
  };
