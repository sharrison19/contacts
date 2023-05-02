import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteContact, initContacts } from "../actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConnectedList = () => {
  const navigate = useNavigate();

  const contacts = useSelector((state) => state.contacts);

  useEffect(() => {
    const promise = axios.get("http://127.0.0.1:5000/contacts");
    promise.then((res) => {
      console.log(res);
      dispatch(initContacts(res.data));
    });
  }, []);

  const dispatch = useDispatch();

  const handleDelete = (contact) => {
    dispatch(deleteContact(contact));
    console.log(contact);
    axios.delete("http://127.0.0.1:5000/contacts/" + contact.id);
  };

  const handleEdit = (contact) => {
    navigate("/contact/" + contact.id);
  };

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
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Website</th>
              <th>Company</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.website}</td>
                  <td>{contact.company}</td>
                  <td>{contact.address}</td>
                  <td className="edit">
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(contact)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(contact)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="no-contacts" colSpan="8">
                  No Contacts Added
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const List = ConnectedList;

export default List;
