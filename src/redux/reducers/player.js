import { SUBMIT_LOGIN } from '../actions';

const INIT_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const player = (state = INIT_STATE, action) => {
  switch (action.type) {
  case SUBMIT_LOGIN:
    return {
      ...state,
      name: action.userName,
      gravatarEmail: action.email,
    };

  default:
    return state;
  }
};

export default player;
