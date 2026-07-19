import React, { useEffect, useState } from "react";
import "./WalletAddress.css";
import { Button, DashHead, TableBody } from "../../components";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import axios from "axios";
import { useGlobalContext } from "../../context/context";

const WalletAddress = () => {
  const [addresses, setAddresses] = useState();
  const [loading, setLoading] = useState(false);
  const { baseUrl } = useGlobalContext();
  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));

  const getAllWalletAddresses = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}admin-wallets`, {
        headers: { token: adminToken },
      })
      .then((data) => {
        if (data.status === 200) {
          setAddresses(data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllWalletAddresses();
  }, []);

  return (
    <section className="wallet_address">
      <DashHead
        title={"Wallet Addresses "}
        paragraph={"See all wallet addresses Here"}
      />
      <div className="food_item_table">
        <div className="food_item_table_header">
          <h4>All Wallet Address</h4>
          <div>
            <p className="paginators_numbers">1-10</p>
            <p className="paginators_length">of 20</p>
            <Button
              fontsize={20}
              color={"var(--color5)"}
              height={35}
              width={35}
              background={"#fff"}
              icon={<RxCaretLeft />}
              border={"1px solid var(--color2)"}
            />
            <Button
              fontsize={20}
              color={"#fff"}
              height={35}
              width={35}
              background={"var(--secondary-color)"}
              icon={<RxCaretRight />}
            />
          </div>
        </div>
        <TableBody
          path={"update-wallet-address"}
          tableData={addresses}
          loading={loading}
        />
      </div>
    </section>
  );
};

export default WalletAddress;
