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
    city: "",
    state: "",
    country: "",
    zipcode: "",
  });

  let id = useQuery();
  let contact = contacts.filter((c) => c.id === id)[0];

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
      city: "",
      state: "",
      country: "",
      zipcode: "",
    });
    navigate("/");
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormState({ ...formState, [id]: value });
  };

  const handlePhoneChange = (value) => {
    setFormState({ ...formState, phone: value });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {/* <p>{formState && formState.id}</p> */}
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
        type="text"
        name="street"
        id="street"
        placeholder="Street Address"
        value={formState.street}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="city"
        id="city"
        placeholder="City"
        value={formState.city}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="state"
        id="state"
        placeholder="State"
        value={formState.state}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="zipcode"
        id="zipcode"
        placeholder="Zipcode"
        value={formState.zipcode}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="country"
        id="country"
        placeholder="Country"
        value={formState.country}
        onChange={handleInputChange}
      />
      <button className="form-submit-btn" type="submit">
        SAVE
      </button>
    </form>
  );
};

const Form = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);

export default Form;
