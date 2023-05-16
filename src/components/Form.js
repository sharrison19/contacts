import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addContact, editContact } from "../actions/index";
import { useState } from "react";
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
  return id;
}

function ConnectedForm({ addContact, editContact, contacts }) {
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
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPhoneError, setShowPhoneError] = useState(false);

  let id = useQuery();
  let contact = contacts.filter((c) => c.id === id)[0];

  useEffect(() => {
    if (id && contact) {
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
    let isError = false;
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formState.email)) {
      isError = true;
      setShowEmailError(true);
    } else {
      setShowEmailError(false);
    }

    const phoneRegex = /^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (!phoneRegex.test(formState.phone)) {
      isError = true;
      setShowPhoneError(true);
    } else {
      setShowPhoneError(false);
    }

    if (isError) {
      return;
    }
    console.log(id, contact);
    if (id && contact) {
      editContact(formState);
      axios.put("http://127.0.0.1:5000/contacts", formState, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
    } else {
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

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="name"
        placeholder="Full Name"
        value={formState.name || ""}
        onChange={handleInputChange}
      />
      {showEmailError && (
        <div className="error">Please enter a valid email address</div>
      )}
      <input
        type="text"
        id="email"
        placeholder="Email"
        value={formState.email || ""}
        onChange={handleInputChange}
        className={showEmailError ? "red-border" : ""}
      />
      {showPhoneError && (
        <div className="error">Please enter a valid phone number</div>
      )}
      <input
        country="US"
        id="phone"
        placeholder="Phone Number"
        value={formState.phone || ""}
        onChange={handleInputChange}
        className={showPhoneError ? "red-border" : ""}
      />
      <input
        type="input"
        id="website"
        placeholder="Website"
        value={formState.website || ""}
        onChange={handleInputChange}
      ></input>
      <input
        type="input"
        id="company"
        placeholder="Company"
        value={formState.company || ""}
        onChange={handleInputChange}
      ></input>
      <input
        type="text"
        name="street"
        id="street"
        placeholder="Street Address"
        value={formState.street || ""}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="city"
        id="city"
        placeholder="City"
        value={formState.city || ""}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="state"
        id="state"
        placeholder="State"
        value={formState.state || ""}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="zipcode"
        id="zipcode"
        placeholder="Zipcode"
        value={formState.zipcode || ""}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="country"
        id="country"
        placeholder="Country"
        value={formState.country || ""}
        onChange={handleInputChange}
      />
      <button className="submit-btn" type="submit">
        SAVE
      </button>
    </form>
  );
}

const Form = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);

export default Form;
