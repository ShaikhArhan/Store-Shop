import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login as AdminLogin } from '../../component/admin/login/Login'
import { Registration as AdminRegistration } from '../../component/admin/regrester/Registration'

export const AdminRoute = () => {
  return (
   <>
   <Routes>
      <Route path="/login" element={<AdminLogin/>} ></Route>
      <Route path="/registration" element={<AdminRegistration/>} ></Route>
    </Routes>
   </>
  )
}
