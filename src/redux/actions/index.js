export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';

export const submitToStore = (state) => ({
  type: SUBMIT_LOGIN,
  ...state,
});
