import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteContact, initContacts } from "../actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const List = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await axios.get("/contacts", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      dispatch(initContacts(response.data));
    };
    fetchContacts();
  }, [dispatch]);

  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    setWidth(window.innerWidth);
  }, []);

  const handleDelete = async (contact) => {
    dispatch(deleteContact(contact));
    await axios.delete(`/contacts/${contact.id}`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
  };

  const handleEdit = (contact) => {
    navigate(`/contact/${contact.id}`);
  };

  const getAddress = (contact) => {
    const { street, city, state, zipcode, country } = contact;
    const addressParts = [street, city, state, zipcode, country].filter(
      (part) => part
    );
    return addressParts.join(", ");
  };

  function formatPhoneNumber(phoneNumberString) {
    const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  }

  return (
    <div className="list">
      <div>
        <button
          className="add-new-contact-button"
          onClick={() => navigate("/contact")}
        >
          Add New Contact
        </button>
      </div>
      <div className="contact-table">
        <ul className="table">
          {width > 700 && (
            <li className="table-row table-headers">
              <div className="stack">
                <div className="header-item">Name</div>
                <div className="header-item">Phone</div>
              </div>
              <div className="stack">
                <div className="header-item">Email</div>
                <div className="header-item">Address</div>
              </div>
              <div className="stack">
                <div className="header-item">Website</div>
                <div className="header-item">Company</div>
              </div>
              <div className="header-item"></div>
            </li>
          )}
          {contacts.length > 0 ? (
            contacts.map((contact) =>
              width > 700 ? (
                <li className="table-row table-contact-info" key={contact.id}>
                  <div className="stack">
                    <div className="contact-information">{contact.name}</div>
                    <div className="contact-information break-all">
                      {formatPhoneNumber(contact.phone)}
                    </div>
                  </div>
                  <div className="stack">
                    <div className="contact-information break-all">
                      {contact.email}
                    </div>
                    <div className="contact-information">
                      {getAddress(
                        contact,
                        contact.city,
                        contact.state,
                        contact.zipcode,
                        contact.country
                      )}
                    </div>
                  </div>
                  <div className="stack">
                    <div className="contact-information break-all">
                      {contact.website}
                    </div>
                    <div className="contact-information">{contact.company}</div>
                  </div>
                  <div className="contact-information edit">
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(contact)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(contact)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </li>
              ) : (
                <li className="table-row" key={contact.id}>
                  <div className="table-width-row">
                    <div className="header-item">Name</div>
                    <div className="contact-information">{contact.name}</div>
                  </div>
                  <div className="table-width-row">
                    <div className="header-item">Phone</div>
                    <div className="contact-information">{contact.phone}</div>
                  </div>
                  <div className="table-width-row">
                    <div className="header-item">Email</div>
                    <div className="contact-information">{contact.email}</div>
                  </div>
                  <div className="table-width-row">
                    <div className="header-item">Address</div>
                    <div className="contact-information">
                      {getAddress(
                        contact,
                        contact.city,
                        contact.state,
                        contact.zipcode,
                        contact.country
                      )}
                    </div>
                  </div>
                  <div className="table-width-row">
                    <div className="header-item">Website</div>
                    <div className="contact-information">{contact.website}</div>
                  </div>
                  <div className="table-width-row">
                    <div className="header-item">Company</div>
                    <div className="contact-information">{contact.company}</div>
                  </div>
                  <div className="contact-information edit">
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(contact)}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(contact)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </div>
                </li>
              )
            )
          ) : (
            <li className="table-row-no-contacts">
              <div className="no-contacts" colSpan={8}>
                No Contacts Added
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default List;
