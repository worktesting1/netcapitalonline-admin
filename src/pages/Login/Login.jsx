import React, { useState } from "react";
import "./Login.css";
import LoginImageHero from "../../asset/Logo.svg";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";

const Login = () => {
  const { baseUrl } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [wait, setwait] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    setLoading(true);
    setTimeout(() => {
      setwait(true);
    }, 10000);
    axios
      .post(`${baseUrl}auth/admin`, data)
      .then((data) => {
        if (data.status === 200) {
          if (wait) {
            setwait(false);
          }
          setLoading(false);
          sessionStorage.setItem(
            "adminToken",
            JSON.stringify(data.data.accessToken)
          );
          navigate("/");
        }
      })
      .catch((error) => {
        setLoading(false);
        setwait(false);

        if (error.response.data === "Wrong credentials") {
          toast.error("Email or Password is not registered");
        }
      });
  };

  return (
    <section className="login_container">
      <div
        style={{
          width: "55%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <img
          src={LoginImageHero}
          alt="hero_image"
          className="hero_login_image"
        />
        <ToastContainer />
        <div className="login_form_container">
          <h3>Login</h3>
          <p className="login_paragraph">Continue from where you stopped</p>
          <form
            className="login_form"
            onSubmit={handleSubmit((data) => handleLogin(data))}
          >
            <div>
              <p className="login_paragraph">Email</p>
              <input
                type="text"
                className="login_inputs"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
              />
              <span> {errors.email?.message}</span>
            </div>
            <div>
              <p className="login_paragraph">Password</p>
              <input
                type="password"
                className="login_inputs"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              <span> {errors.password?.message}</span>
            </div>
            <button style={{ backgroundColor: "#27AE61" }} className="btn">
              {wait ? (
                "Please Wait! while we load contents for security reasons"
              ) : loading ? (
                "Loading..."
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>
        </div>
        <p>2021. All Rights Reserved</p>
      </div>
      <div className="login_image"></div>
    </section>
  );
};

export default Login;
