import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteContact, editContact } from "../actions";

const ConnectedList = () => {
  const contacts = useSelector((state) => state.contacts);

  const dispatch = useDispatch();

  const handleDelete = (contact) => {
    dispatch(deleteContact(contact));
  };

  const handleEdit = (contact) => {
    dispatch(editContact(contact));
  };

  return (
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
              <td>No Contacts Added</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const List = ConnectedList;

export default List;
