import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // const baseUrl = "http://localhost:5000/api/";
  const baseUrl = "https://wealthwise-api-lac.vercel.app/api/";

  const [allDeposits, setAllDeposits] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [userKyc, setUserKyc] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [dLoading, setDLoading] = useState(false);
  const [kLoading, setKLoading] = useState(false);
  const [userDLoading, setUserDLoading] = useState(false);
  const [usersLoading, setSLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [allLoans, setAllLoans] = useState([]);
  const [userKYC, setUserKYC] = useState([]);
  const [widthDrawals, setWidthDrawals] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [widthDrawalsLoading, setWidthDrawalsLoading] = useState(false);
  const [fundingRequests, setFundingRequests] = useState([]);
  const [wLoading, setWLoading] = useState(false);
  const [allCards, setAllCards] = useState([]);
  const [cardLoader, setCardLoader] = useState(false);
  const navigate = useNavigate();

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
  const getAllFundingRequest = (token) => {
    axios
      .get(`${baseUrl}admin/funding-requests`, {
        headers: { token: token },
      })
      .then((data) => {
        setFundingRequests(data.data.requests);
      })
      .catch((error) => {});
  };
  const getAllWithdrawals = (token) => {
    setWidthDrawalsLoading(true);
    axios
      .get(`${baseUrl}withdraw`, {
        headers: { token: token },
      })
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          setWidthDrawals(response.data.withdrawals);
          setWidthDrawalsLoading(false);
        }
      })
      .catch((error) => {
        // setWidthDrawalsLoading(false);
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

  const withdrawalFailed = (id, userId) => {
    setWLoading(true);
    axios
      .put(
        `${baseUrl}wallet/withdrawals/approve/${id}`,
        {
          status: "failed",
        },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        if (data.status === 200) {
          setWLoading(false);
          getUserDetails(userId);
          toast.success("Withdrawal Reject");
          setTimeout(() => {
            navigate("/all-withdrawals");
          }, 2000);
        }
      })
      .catch((error) => {
        if (error.response.data.message === "Withdrawal already finalized") {
          toast.error("Withdrawal already finalized");
        }

        setWLoading(false);
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

  const getTotalBalance = (userId, token) => {
    axios
      .get(`${baseUrl}wallet/${userId}`, { headers: { token } })
      .then((response) => {
        setTotalAmount(response.data.balanceUSD);
      })
      .catch((error) => {});
  };

  const getAllLoans = (token) => {
    axios
      .get(`${baseUrl}loan`, {
        headers: { token: token },
      })
      .then((data) => {
        if (data.status === 200) {
          setAllLoans(data.data.loan);
        }
      })
      .catch((error) => {});
  };

  // Get All Cards
  const getAllCards = (token) => {
    setCardLoader(true);
    axios
      .get(`${baseUrl}card`, {
        headers: { token: token },
      })
      .then((data) => {
        console.log(data);

        if (data.status === 200) {
          setAllCards(data.data.cards);
          setCardLoader(false);
        }
      })
      .catch((error) => {
        console.log(error);

        setCardLoader(false);
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
        getAllFundingRequest,
        fundingRequests,
        widthDrawals,
        widthDrawalsLoading,
        getAllWithdrawals,
        getTotalBalance,
        totalAmount,
        wLoading,
        withdrawalFailed,
        allLoans,
        getAllLoans,
        cardLoader,
        getAllCards,
        allCards,
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
