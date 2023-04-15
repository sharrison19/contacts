// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { useParams } from "react-router";
// import { useNavigate } from "react-router-dom";

// const EditContact = ({ contacts, updateContact }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const currentContact = contacts.find(
//     (contact) => contact.id === parseInt(id)
//   );

//   useEffect(() => {
//     setName(currentContact.name);
//     setEmail(currentContact.email);
//     setPhone(currentContact.phone);
//     setCompany(currentContact.company);
//     setWebsite(currentContact.website);
//     setAddress(currentContact.address);
//   }, [currentContact]);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [company, setCompany] = useState("");
//   const [website, setWebsite] = useState("");
//   const [address, setAddress] = useState("");
//   const [fillInAllFieldsError, setFillInAllFirledsErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [emailExistsMessage, setEmailExistsMessage] = useState("");
//   const [phoneExistsMessage, setPhoneExistsMessage] = useState("");

//   setFillInAllFirledsErrorMessage("Please fill in all fields");
//   setEmailExistsMessage("This email already exists");
//   setPhoneExistsMessage("This phone number already exists");
//   setSuccessMessage("Contact updated successfully!");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const checkContactEmailExists = contacts.filter((contact) =>
//       contact.email === email && contact.id !== currentContact.id
//         ? contact
//         : null
//     );
//     const checkContactPhoneExists = contacts.filter((contact) =>
//       contact.phone === phone && contact.id !== currentContact.id
//         ? contact
//         : null
//     );

//     if (!email || !name || !phone || !company || !website || !address) {
//       <p className="error"> {fillInAllFieldsError} </p>;
//     }
//     if (checkContactEmailExists.length > 0) {
//       <p className="error"> {emailExistsMessage} </p>;
//     }
//     if (checkContactPhoneExists.length > 0) {
//       <p className="error"> {phoneExistsMessage} </p>;
//     }

//     const data = {
//       id: currentContact.id,
//       email,
//       name,
//       phone,
//       website,
//       company,
//       address,
//     };

//     updateContact(data);
//     <p className="success">{successMessage}</p>;
//     navigate("/");
//   };

//   return (
//     <div className="container">
//       <div className="edit-contact">
//         <button className="go-back-btn" onClick={() => navigate("/")}>
//           Go back
//         </button>
//         <div className="edit-contact-form">
//           {currentContact ? (
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <input
//                   className="form-control"
//                   value={name}
//                   placeholder={"Name"}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <input
//                   className="form-control"
//                   value={email}
//                   placeholder={"Email"}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <input
//                   className="form-control"
//                   value={phone}
//                   placeholder={"Phone"}
//                   onChange={(e) => setPhone(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <input
//                   className="form-control"
//                   value={company}
//                   placeholder={"Company"}
//                   onChange={(e) => setCompany(e.target.value)}
//                 />
//                 <div className="form-group">
//                   <input
//                     className="form-control"
//                     value={website}
//                     placeholder={"Website"}
//                     onChange={(e) => setWebsite(e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     className="form-control"
//                     value={address}
//                     placeholder={"Address"}
//                     onChange={(e) => setAddress(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="form-group d-flex align-items-center justify-content-between my-2">
//                 <button type="submit" className="btn btn-primary">
//                   Update Contact
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   onClick={() => navigate("/")}
//                 >
//                   cancel
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <h1 className="text-center">No Contact Found</h1>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   contacts: state,
// });
// const mapDispatchToProps = (dispatch) => ({
//   updateContact: (data) => {
//     dispatch({ type: "UPDATE_CONTACT", payload: data });
//   },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
