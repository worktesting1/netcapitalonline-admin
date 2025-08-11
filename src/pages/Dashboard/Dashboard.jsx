import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { DashboardHeader, DashboardNav } from "../../components";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../../utils/data";

import Order from "../Order/Order";
import Customers from "../Customers/Customers";
import NotificationTab from "../NotificationTab";
import CustomerDetails from "../CustomersDetails/CustomerDetails";
import DeleteCustomerModal from "../DeleteCustomerModal";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import CreateFoodItems from "../CreateFoodItems/CreateFoodItems";
import Withdrawals from "../Withdrawals/Transaction";
import Deposits from "../Deposits/Transaction";
import PrivateRoute from "../../utils/PrivateRoute";
import WalletAddress from "../WalletAddress/WalletAddress";
import UpdateWalletAddress from "../UpdateWalletAddress/UpdateWalletAddress";
import axios from "axios";
import { useGlobalContext } from "../../context/context";
import ActivateDeposit from "../ActivateDeposit";
import { ToastContainer, toast } from "react-toastify";
import ActivateWithdrawals from "../ActivateWithdrawals";

const Dashboard = () => {
  const { pathname } = useLocation();
  const [notification, setNotification] = useState(false);
  const [removeCustomer, setRemoveCustomer] = useState(false);
  const [depositLoading, setDepositLoading] = useState(false);
  const [failedLoading, setFailedLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [kYCId, setKYCId] = useState("");
  const [updateStatus, setUpdateStatus] = useState(false);
  const [depositId, setDepositId] = useState(null);
  const [visibility, setVisibility] = useState(false);
  const [endPoint, setEndPoint] = useState("");
  const [email, setEmail] = useState("");
  const [withdrawalLoading, setwithdrawalLoading] = useState(false);

  const navigate = useNavigate();

  const [updateWithdrawal, setupdateWithdrawal] = useState(false);
  const [deleteLoading, setDeleteLoader] = useState(false);
  const { baseUrl, getAllUsers, getUserDetails } = useGlobalContext();

  const toggleVisibility = () => setVisibility(!visibility);

  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));
  const toggleDeleteCustomers = (id) => {
    setRemoveCustomer(!removeCustomer);
    setUserId(id);
  };

  const deleteUser = () => {
    setDeleteLoader(true);
    axios
      .delete(`${baseUrl}users/${userId}`, {
        headers: { token: adminToken },
      })
      .then((data) => {
        if (data.status === 200) {
          toast.success("User deleted");
          setDeleteLoader(false);
          setTimeout(() => {
            getAllUsers(adminToken);
            setRemoveCustomer(!removeCustomer);
          }, 2000);
        }
      })
      .catch((error) => {
        setDeleteLoader(false);
        // toast.error("User Already Deleted");
      });
  };

  const toggleNotification = () => {
    setNotification(!notification);
  };

  const toggleDepositStatus = (id, userID, endPoint) => {
    setDepositId(id);
    setKYCId(id);
    setUserId(userID);
    setUpdateStatus(!updateStatus);
    setEndPoint(endPoint);
  };

  const toggleWithdrawalStatus = (id, userID) => {
    setDepositId(id);
    setUserId(userID);
    setupdateWithdrawal(!updateWithdrawal);
  };

  const withdrawalApproved = (id) => {
    setwithdrawalLoading(true);
    axios
      .put(
        `${baseUrl}wallet/withdrawals/approve/${id}`,
        {
          status: "approved",
        },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        if (data.status === 200) {
          setwithdrawalLoading(false);
          getUserDetails(userId);
          toast.success("Withdrawal Approved");
          setTimeout(() => {
            navigate("/all-withdrawals");
            setupdateWithdrawal(!updateStatus);
          }, 2000);
        }
      })
      .catch((error) => {
        setwithdrawalLoading(false);
      });
  };
  const updateKYC = (id) => {
    setFailedLoading(true);
    axios
      .put(
        `${baseUrl}kyc/${id}`,
        {
          status: true,
          email,
        },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        if (data.status === 200) {
          setFailedLoading(false);
          toast.success("User KYC Status Updated");
          setTimeout(() => {
            navigate("/users");
            setUpdateStatus(!updateStatus);
            setEndPoint("");
          }, 3000);
        }
      })
      .catch((error) => {
        setFailedLoading(false);
      });
  };

  // Update Deposit to Approved Status
  const updateDepositApproved = () => {
    setDepositLoading(true);
    axios
      .put(
        `${baseUrl}deposit/${depositId}`,
        {
          status: "approved",
        },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        if (data.status === 200) {
          setDepositLoading(false);
          getUserDetails(userId);
          setTimeout(() => {
            navigate("/all-deposits");
            setUpdateStatus(!updateStatus);
          }, 2000);
        }
      })
      .catch((error) => {
        setDepositLoading(false);
      });
  };

  const updateDepositFailed = (id) => {
    setFailedLoading(true);
    axios
      .put(
        `${baseUrl}deposit/${id}`,
        {
          status: "failed",
        },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        toast.error("Deposit Failed");
        if (data.status === 200) {
          getUserDetails(id);
          setFailedLoading(false);
          setTimeout(() => {
            navigate("/all-deposits");
            setUpdateStatus(!updateStatus);
          }, 3000);
        }
      })
      .catch((error) => {
        setFailedLoading(false);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <section className="dashboard">
      <DashboardHeader toggleVisibility={toggleVisibility} />
      <div className="main_sect">
        <DashboardNav
          navItems={navItems}
          pathname={pathname}
          visibility={visibility}
          toggleVisibility={toggleVisibility}
        />
        <div className="routes_views">
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route element={<Order />} path="/" />
              <Route path="/update_profile" element={<UpdateProfile />} />
              <Route path="/update-client/:id" element={<CreateFoodItems />} />
              <Route path="/all-deposits" element={<Deposits />} />
              <Route path="/all-withdrawals" element={<Withdrawals />} />
              <Route path="/wallet-address" element={<WalletAddress />} />
              <Route
                path="/update-wallet-address/:id"
                element={<UpdateWalletAddress />}
              />
              <Route
                element={
                  <Customers toggleNotification={toggleDeleteCustomers} />
                }
                path="/users"
              />
              <Route
                element={
                  <CustomerDetails
                    toggleDepositStatus={toggleDepositStatus}
                    setEmail={setEmail}
                    toggleWithdrawalStatus={toggleWithdrawalStatus}
                  />
                }
                path="/user-details/:id"
              />
            </Route>
          </Routes>
          <NotificationTab
            toggleNotification={toggleNotification}
            notification={notification}
          />
          <DeleteCustomerModal
            toggleDeleteCustomers={toggleDeleteCustomers}
            removeCustomer={removeCustomer}
            deleteUser={deleteUser}
            loading={deleteLoading}
          />
          <ActivateDeposit
            updateStatus={updateStatus}
            toggleActivateDeposit={toggleDepositStatus}
            updateDepositApproved={updateDepositApproved}
            id={depositId}
            depositLoading={depositLoading}
            failedLoading={failedLoading}
            endPoint={endPoint}
            updateKYC={updateKYC}
            kYCId={kYCId}
            updateDepositFailed={updateDepositFailed}
          />
          <ActivateWithdrawals
            updateStatus={updateWithdrawal}
            toggleActivateDeposit={toggleWithdrawalStatus}
            updateDepositApproved={withdrawalApproved}
            id={depositId}
            depositLoading={withdrawalLoading}
            userId={userId}
          />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Dashboard;
