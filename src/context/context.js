import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const baseUrl = "http://localhost:5000/api/";
  // const baseUrl = "https://profitmonitoring-api.onrender.com/api/";

  const [allDeposits, setAllDeposits] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [userKyc, setUserKyc] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [dLoading, setDLoading] = useState(false);
  const [kLoading, setKLoading] = useState(false);
  const [userDLoading, setUserDLoading] = useState(false);
  const [usersLoading, setSLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [userKYC, setUserKYC] = useState([]);
  const [withdrawHistory, setWithdrawHistory] = useState([]);
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
  const getWithdrawals = (token) => {
    setDLoading(true);
    axios
      .get(`${baseUrl}transfer`, {
        headers: { token: token },
      })
      .then((data) => {
        if (data.status === 200) {
          setWithdrawHistory(data.data.transfers);
          setDLoading(false);
        }
      })
      .catch((error) => {
        setDLoading(false);
      });
  };

  // GET USER KYC DETAILS

  const getUserKyc = (id) => {
    setSLoading(true);
    axios
      .get(`${baseUrl}kyc/${id}`, {
        headers: { token: adminToken },
      })
      .then((data) => {
        if (data.status === 200) {
          setKLoading(false);
          setUserKYC(data.data);
        }
      })
      .catch((error) => {
        setKLoading(false);
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
  const getAllKyc = () => {
    setUserDLoading(true);
    axios
      .get(`${baseUrl}kyc`, {
        headers: { token: adminToken },
      })
      .then((data) => {
        if (data.status === 200) {
          setUserKyc(data.data);
          setUserDLoading(false);
        }
      })
      .catch((error) => {
        setUserDLoading(false);
      });
  };

  // Get User Details
  const getUserDetails = (id) => {
    setUserLoading(true);
    axios
      .get(`${baseUrl}users/admin/${id}`, {
        headers: { token: adminToken },
      })
      .then((data) => {
        if (data.status === 200) {
          setUserDetails(data.data);
          setUserLoading(false);
        }
      })
      .catch((error) => {
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
        userKyc,
        getAllKyc,
        getUserDetails,
        userDetails,
        dLoading,
        usersLoading,
        userLoading,
        userDLoading,
        getUserKyc,
        userKYC,
        kLoading,
        getWithdrawals,
        withdrawHistory,
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
