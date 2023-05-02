import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addContact, editContact } from "../actions/index";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function mapDispatchToProps(dispatch) {
  return {
    addContact: (contact) => dispatch(addContact(contact)),
    editContact: (contact) => dispatch(editContact(contact)),
  };
}

function mapStateToProps(state) {
  return {
    contacts: state.contacts,
  };
}

function useQuery() {
  const { pathname } = useLocation();
  const id = parseInt(pathname.split("/contact/")[1]);
  console.log(id);

  return id;
}

const ConnectedForm = ({ addContact, editContact, contacts }) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    company: "",
    address: "",
  });

  let id = useQuery();
  let contact = contacts.filter((c) => c.id == id)[0];
  useEffect(() => {
    if (id && contact) {
      console.log(contact);
      setFormState((formState) => {
        return contact;
      });
    } else {
      setFormState((formState) => {
        return { ...formState, id: Date.now() };
      });
    }
  }, [contact, id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id && contact) {
      console.log(formState);
      editContact(formState);
      axios.put("http://127.0.0.1:5000/contacts", formState, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
    } else {
      console.log("contact added");
      addContact(formState);
      axios.post("http://127.0.0.1:5000/contacts", formState, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
    }
    setFormState({
      name: "",
      email: "",
      phone: "",
      website: "",
      company: "",
      address: "",
    });
    navigate("/");
  };

  const handleInputChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value });
  };

  const handlePhoneChange = (value) => {
    setFormState({ ...formState, phone: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>{formState && formState.id}</p>
      <input
        type="text"
        id="name"
        placeholder="Enter Name Here"
        value={formState.name}
        onChange={handleInputChange}
      ></input>
      <input
        type="text"
        id="email"
        placeholder="Enter Email Here"
        value={formState.email}
        onChange={handleInputChange}
      ></input>
      <PhoneInput
        country="US"
        id="phone"
        placeholder="Enter Phone Number Here"
        value={formState.phone}
        onChange={handlePhoneChange}
      ></PhoneInput>
      <input
        type="input"
        id="website"
        placeholder="Enter Website Here"
        value={formState.website}
        onChange={handleInputChange}
      ></input>
      <input
        type="input"
        id="company"
        placeholder="Enter Company Here"
        value={formState.company}
        onChange={handleInputChange}
      ></input>
      <input
        type="input"
        id="address"
        placeholder="Enter Address Here"
        value={formState.address}
        onChange={handleInputChange}
      ></input>
      <button type="submit">SAVE</button>
    </form>
  );
};

const Form = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);

export default Form;

//ID, Name, Email, Phone, website, company, address
