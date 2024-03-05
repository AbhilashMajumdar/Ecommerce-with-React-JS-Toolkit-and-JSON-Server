import React from 'react'
import Navbar from '../features/navbar/Navbar'
import { AdminProductList } from '../features/admin/AdminProductList'
import Footer from '../common/Footer'

const AdminHomePage = () => {
  return (
    <>
        <Navbar>
            <AdminProductList />
        </Navbar>
        <Footer />
    </>
  )
}

export default AdminHomePage