import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminProductForm from '../features/admin/AdminProductForm'

const AdminProductFormPage = () => {
  return (
    <>
        <Navbar>
            <AdminProductForm />
        </Navbar>
    </>
  )
}

export default AdminProductFormPage