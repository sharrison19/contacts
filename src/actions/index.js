import { ADD_CONTACT } from "../constants/action-types";
import { EDIT_CONTACT } from "../constants/action-types";
import { DELETE_CONTACT } from "../constants/action-types";

export const addContact = (payload) => {
  return {
    type: ADD_CONTACT,
    payload,
  };
};

export const editContact = (payload) => {
  return {
    type: EDIT_CONTACT,
    payload,
  };
};

export const deleteContact = (payload) => {
  return {
    type: DELETE_CONTACT,
    payload,
  };
};
