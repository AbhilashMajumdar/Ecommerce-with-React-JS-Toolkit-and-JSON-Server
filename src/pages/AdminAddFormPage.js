import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminAddForm from '../features/admin/components/AdminAddForm'

const AdminAddFormPage = () => {
  return (
    <>
        <Navbar>
            <AdminAddForm />
        </Navbar>
    </>
  )
}

export default AdminAddFormPage