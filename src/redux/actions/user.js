export const USER_RETRIEVED = 'USER_RETRIEVED';

export const userRetrievedStatus = (status, user) => ({
  type: USER_RETRIEVED,
  status,
  user
});