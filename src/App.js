
import React, { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    firstName:"", lastName:"", email:"", phone:"", password:"",
    confirmPassword:"", dob:"", address:"", city:"", country:""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    else if (formData.firstName.length < 3) newErrors.firstName = "Minimum 3 characters";

    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";

    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Must be 10 digits";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Minimum 6 characters";

    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm Password is required";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!formData.dob) newErrors.dob = "Date of Birth is required";

    if (!formData.address) newErrors.address = "Address is required";
    else if (formData.address.length < 10) newErrors.address = "Minimum 10 characters";

    if (!formData.city) newErrors.city = "City is required";

    if (!formData.country) newErrors.country = "Country is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  const renderInput = (label, name, type="text") => (
    <div className="field">
      <label>{label}</label>
      <input type={type} name={name} value={formData[name]} onChange={handleChange} />
      {errors[name] && <span className="error">{errors[name]}</span>}
    </div>
  );

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Student Registration Form</h2>

        {renderInput("First Name","firstName")}
        {renderInput("Last Name","lastName")}
        {renderInput("Email","email","email")}
        {renderInput("Phone Number","phone")}
        {renderInput("Password","password","password")}
        {renderInput("Confirm Password","confirmPassword","password")}
        {renderInput("Date of Birth","dob","date")}
        {renderInput("Address","address")}
        {renderInput("City","city")}
        {renderInput("Country","country")}

        <button type="submit">Submit</button>

        {submitted && (
          <p className="success">Form submitted successfully!</p>
        )}
      </form>
    </div>
  );
}
