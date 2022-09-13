import { SUBMIT_LOGIN, SUBMIT_SCORE } from '../actions';

const INIT_STATE = {
  name: '',
  assertions: 0,
  score: 0,
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
  case SUBMIT_SCORE:
    return {
      ...state,
      ...action.obj,
    };

  default:
    return state;
  }
};

export default player;
