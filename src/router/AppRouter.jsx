import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../components/Navbar";
import FormClient from "../pages/FormClient";
import FormProject from "../pages/FormProject";
import Home from "../pages/Home";
import Login from "../pages/Login";
import TableClient from "../pages/TableClient";
import TableInvoices from "../pages/TableInvoices";
import TableProject from "../pages/TableProject";
import { Register }from "../pages/registerPage";
import { PrivateRoute } from "./PrivateRoute";



export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="sign-up" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route index element={<Home />} />
        <Route path="/" element={<NavBar />}>
        
        <Route path="TableClient" element={
          <PrivateRoute>
            <TableClient />
          </PrivateRoute>} />
        
        <Route path="FormProject" element={
          <PrivateRoute>
            <FormProject />
          </PrivateRoute>} />
        
        <Route path="TableProject" element={
          <PrivateRoute>
            <TableProject />
          </PrivateRoute>} />
        
        <Route path="FormClient" element={
          <PrivateRoute>
            <FormClient />
          </PrivateRoute>} />

          <Route path="TableInvoices" element={
          <PrivateRoute>
            <TableInvoices/>
          </PrivateRoute>} />
        
        </Route>
      </Routes>
    </>
  )
}