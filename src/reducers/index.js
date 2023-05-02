import {
  ADD_CONTACT,
  EDIT_CONTACT,
  DELETE_CONTACT,
  INIT_CONTACTS,
  USER_LOGIN,
  USER_LOGOUT,
} from "../constants/action-types";

const initialState = {
  contacts: [],
  user: null,
};

function rootReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case INIT_CONTACTS:
      return { ...state, contacts: action.payload };
    case ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, action.payload] };

    case EDIT_CONTACT:
      console.log("test");
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          if (contact.id == action.payload.id) {
            return action.payload;
          } else {
            return contact;
          }
        }),
      };

    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload.id
        ),
      };

    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
      };

    case USER_LOGOUT:
      localStorage.setItem("token", null);
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}

export default rootReducer;
