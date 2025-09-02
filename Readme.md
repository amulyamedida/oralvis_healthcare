# OralVis Healthcare - Dental Scan Management System

A full-stack web application for managing dental scans, designed for technicians and dentists. The system allows technicians to securely upload patient scans, while dentists can view all uploaded scans in a professional and responsive interface.

---

## Features

- **User Authentication & Roles**
  - Signup & Login
  - Role-based access: Technician / Dentist
- **Technician**
  - Upload patient scans (image + metadata)
  - Automatic image compression for large files
  - Cloudinary integration for secure image hosting
- **Dentist**
  - View uploaded scans in a responsive card layout
- **Professional UI**
  - Centered forms for login, signup, and upload
  - Vertical form layout with consistent styling
  - Responsive and modern design

---

## Technologies

**Frontend:**
- React.js (Vite)
- React Router
- Axios
- CSS3 

**Backend:**
- Node.js & Express.js
- SQLite 
- JWT authentication
- bcryptjs for password hashing
- Multer for file uploads
- Sharp for image compression
- Cloudinary for image hosting

---

