import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactUsList = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, [refresh]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/contactus`, { withCredentials: true });
      setContacts(response.data);
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/contactus`, { withCredentials: true });
        setContacts(response.data);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [API_BASE_URL]);

  // Function to toggle read/unread status
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "unread" ? "read" : "unread";
  
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/contactus/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      console.log("Response:", response.data);
      setRefresh(prev => !prev);
    } catch (err) {
      console.error("Error updating status:", err.response?.data || err.message);
    }
  };
  
  

    // Count messages
    const totalMessages = contacts.length;
    const unreadMessages = contacts.filter(contact => contact.status === "unread").length;
    const readMessages = contacts.filter(contact => contact.status === "read").length;

  // Filter contacts based on selection
  const filteredContacts = contacts.filter(contact =>
    filter === "all" ? true : contact.status === filter
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    // <div>
    //   <h2>Contact Us Submissions</h2>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Details</th>
    //         <th>Message</th>
    //         <th>Submitted At</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {contacts.map((contact) => (
    //         <tr key={contact.id}>
    //           <td><b>Name: </b>{contact.name}  <br/><b>Email: </b> {contact.email} <br/><b>Phone Number: </b> {contact.phone_number}</td>
    //           <td>{contact.message}</td>
    //           <td>{new Date(contact.created_at).toLocaleString()}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>

    <div className="contact-container-list">
      <h2 className="contact-heading">Contact Us Submissions</h2>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")} style={{background:'rgb(107, 107, 107)'}}>All ({totalMessages})</button>
        <button onClick={() => setFilter("unread")} style={{background:'rgb(193, 63, 41)'}}>Unread ({unreadMessages})</button>
        <button onClick={() => setFilter("read")}>Read ({readMessages})</button>
      </div>
      <div>
      {filteredContacts.map((contact) => (
          <div key={contact.id} className="contact-card">
            <p className="contact-text"><b>Name:</b> {contact.name}</p>
            <p className="contact-text"><b>Email:</b> {contact.email}</p>
            <p className="contact-text"><b>Phone Number:</b> {contact.phone_number}</p>
            <p className="contact-text"><b>Message:</b> {contact.message}</p>
            <p className="contact-timestamp"><b>Submitted At:</b> {new Date(contact.created_at).toLocaleString()}</p>
            <p className={`contact-status ${contact.status}`}>Status: {contact.status}</p>
            {/* Toggle Read/Unread Button */}
            <button onClick={() => toggleStatus(contact.id, contact.status)} className="toggle-btn">
              Mark as {contact.status === "unread" ? "Read" : "Unread"}
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactUsList;
