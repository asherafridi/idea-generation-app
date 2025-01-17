import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios'; // You can use fetch if you prefer

export default function DataEntryModal( {setusername}:{setusername:any}) {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: ''
    });

    useEffect(() => {
        const checkLeadCookie = () => {
            const leadCookie = document.cookie.split('; ').find(row => row.startsWith('lead='));
            if (!leadCookie) {
                // If the 'lead' cookie does not exist, trigger the function to show the modal
                handleShow();
            }
        };

        checkLeadCookie();
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
            const response = await axios.post('https://670e49e1073307b4ee463c70.mockapi.io/czit_leads', formData);
            console.log(response.data);
            alert('Data submitted successfully!');
            document.cookie = `lead=${formData.name}`;
            setusername(true);
            handleClose(); // Close the modal on successful submission

        } catch (error) {
            console.error('There was an error submitting the data!', error);
        }
    };

    return (
        <>
<Modal show={show} centered>
      {/* Custom Modal Header */}
      <Modal.Header className='custom-modal-header'>
        <Modal.Title className="custom-modal-title">Please provide your details</Modal.Title>
      </Modal.Header>

      {/* Modal Body with Form */}
      <Modal.Body className="custom-modal-body">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label className="custom-label">Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="custom-input"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhoneNumber">
            <Form.Label className="custom-label">Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="custom-input"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="custom-label">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="custom-input"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="custom-submit-btn">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
        </>
    );
}
