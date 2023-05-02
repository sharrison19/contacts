import { ADD_CONTACT } from "../constants/action-types";
import { EDIT_CONTACT } from "../constants/action-types";
import { DELETE_CONTACT } from "../constants/action-types";
import { INIT_CONTACTS } from "../constants/action-types";
import { USER_LOGIN } from "../constants/action-types";
import { USER_LOGOUT } from "../constants/action-types";

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

export const initContacts = (payload) => {
  return {
    type: INIT_CONTACTS,
    payload,
  };
};

export const userLogin = (payload) => {
  return {
    type: USER_LOGIN,
    payload,
  };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};
