import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addContact } from "../actions/index";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { BrowserRouter as useLocation } from "react-router-dom";

function mapDispatchToProps(dispatch) {
  return {
    addContact: (contact) => dispatch(addContact(contact)),
  };
}

function mapStateToProps(state) {
  return {
    contacts: state.contacts,
  };
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ConnectedForm = ({ addContact, contacts }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    company: "",
    address: "",
  });

  let query = useQuery();

  useEffect(() => {
    let id = query.get("id");
    if (id) {
      let contact = contacts.filter((c) => c.id == id)[0];
      console.log(contacts);
      setFormState((formState) => {
        return contact;
      });
    } else {
      id = Date.now();
      setFormState((formState) => {
        return { ...formState, id };
      });
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    addContact(formState);
    setFormState({
      name: "",
      email: "",
      phone: "",
      website: "",
      company: "",
      address: "",
    });
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
