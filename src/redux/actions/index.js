export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const SUBMIT_SCORE = 'SUBMIT_SCORE';

export const submitToStore = (state) => ({
  type: SUBMIT_LOGIN,
  ...state,
});

export const submitScore = (obj) => ({
  type: SUBMIT_SCORE,
  obj,
});
