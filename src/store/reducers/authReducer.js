    
const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch(action.type) {
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: action.err
      }
    case 'LOGIN_SUCCESS':
      console.log('LOGIN SUCCESSFUL!');
      return {
        ...state,
        authError: null
      }
    case 'SIGNOUT_SUCCESS':
      console.log('SIGNOUT SUCCESSFUL!');
      return state;
    case 'SIGNUP_SUCCESS':
      console.log('SIGNUP SUCCESSFUL!');
      return {
        ...state,
        authError: null
      }
    case 'SIGNUP_ERROR':
      console.log('SIGNUP FAILED!');
      return {
        ...state,
        authError: action.err.message
      }
    default:
      return state;
  }
};

export default authReducer;