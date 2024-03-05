import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminProductDetails from '../features/admin/AdminProductDetails'
import Footer from '../common/Footer'

const AdminProductDetailsPage = () => {
  return (
    <>
        <Navbar>
            <AdminProductDetails />
        </Navbar>
        <Footer />
    </>
  )
}

export default AdminProductDetailsPage