import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import data from "./json/route.json";

export const PrivateRoute = ({ component }) => {
  const { loginUser } = useSelector((state) => state.login);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);   
  const navigate = useNavigate();
  // console.log('isAuthenticated: ', isAuthenticated);
  useEffect(() => {
    if (loginUser) {
      // console.log('loginUser: ', loginUser);
      const role =loginUser?.isAdmin==true?"admin":"user";
      // console.log('role: ', role);
      const exist = data[role]?.includes(component);
      setIsAuthenticated(exist);
      setCheckedAuth(true); 
    } else {
      setCheckedAuth(true); 
    }
  }, [loginUser, component]);

  useEffect(() => {
    if (checkedAuth && !isAuthenticated) {
      navigate("/login");
    }
  }, [checkedAuth, isAuthenticated, navigate]);

  useCallback(()=>{    
    !isAuthenticated && navigate('/login');
  },[isAuthenticated])

  return isAuthenticated ? <Outlet /> : null;
};
