import {
  ADD_CONTACT,
  EDIT_CONTACT,
  DELETE_CONTACT,
} from "../constants/action-types";

const initialState = {
  contacts: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, action.payload] };

    case EDIT_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          if (contact.id === action.id) {
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

    default:
      return state;
  }
}

export default rootReducer;
