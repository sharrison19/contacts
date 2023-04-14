import { ADD_CONTACT, ADD_NEW_CONTACT } from "../constants/action-types";
import { EDIT_CONTACT } from "../constants/action-types";
import { DELETE_CONTACT } from "../constants/action-types";

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
      const deleteFilter = state.filter((contact) =>
        contact.id === action.payload ? null : contact
      );
      state = deleteFilter;
      return state;
    // return {
    //   ...state,
    //   contacts: state.contacts.filter((contact) => contact.id !== action.id),
    // };

    default:
      return state;
  }
}

export default rootReducer;
