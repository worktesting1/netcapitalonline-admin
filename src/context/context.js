import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // const baseUrl = "https://cryptoexpertluno-api.onrender.com/api/v1";
  // const baseUrl = "http://localhost:5000/api/";
  const baseUrl = "https://profitmonitoring-api.onrender.com/api/";

  const [allDeposits, setAllDeposits] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [userDeposits, setUserDeposits] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [dLoading, setDLoading] = useState(false);
  const [userDLoading, setUserDLoading] = useState(false);
  const [usersLoading, setSLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));

  // Get All Deposits
  const getAllDeposits = (token) => {
    setDLoading(true);
    axios
      .get(`${baseUrl}deposit`, {
        headers: { token: token },
      })
      .then((data) => {
        if (data.status === 200) {
          setAllDeposits(data.data.deposits);
          setDLoading(false);
        }
      })
      .catch((error) => {
        setDLoading(false);
      });
  };

  // Get All Users
  const getAllUsers = (token) => {
    setSLoading(true);
    axios
      .get(`${baseUrl}users`, {
        headers: { token: token },
      })
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          setSLoading(false);
          setAllUsers(data.data);
        }
      })
      .catch((error) => {
        setSLoading(false);
      });
  };

  // Get User Deposits
  const getUserDeposits = (id) => {
    // setUserDLoading(true);
    // axios
    //   .get(`${baseUrl}deposit/${id}`, {
    //     headers: { token: adminToken },
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     if (data.status === 200) {
    //       setUserDeposits(data.data);
    //       setUserDLoading(false);
    //     }
    //   })
    //   .catch((error) => {
    //     setUserDLoading(false);
    //     console.log(error);
    //   });
  };

  // Get User Details
  const getUserDetails = (id) => {
    setUserLoading(true);
    axios
      .get(`${baseUrl}users/admin/${id}`, {
        headers: { token: adminToken },
      })
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          setUserDetails(data.data);
          setUserLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setUserLoading(false);
      });
  };

  return (
    <AppContext.Provider
      value={{
        baseUrl,
        getAllDeposits,
        allDeposits,
        getAllUsers,
        allUsers,
        userDeposits,
        getUserDeposits,
        getUserDetails,
        userDetails,
        dLoading,
        usersLoading,
        userLoading,
        userDLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
