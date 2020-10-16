export interface UserState {
  loggedIn: boolean;
}

const initialState: UserState = {
  loggedIn: false,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case "SET_AUTHENTICATED":
      return {
        ...state,
        loggedIn: true,
      };
    case "SET_UNAUTHENTICATED":
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
}
