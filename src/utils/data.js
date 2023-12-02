import imageOne from "../asset/dashboard.svg";
import imageFive from "../asset/order.svg";
import customers from "../asset/profile-2user copy.svg";
import delivery from "../asset/security-user copy.svg";
import user from "../asset/user.svg";
import settings from "../asset/setting.svg";
import contact from "../asset/contact.svg";
import about from "../asset/about.svg";
import Wallet from "../asset/wallet.svg";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { RiTerminalWindowFill } from "react-icons/ri";

export const navItems = [
  {
    category: "Menu",
    details: [
      {
        name: "Dashboard",
        img: imageOne,
        path: "",
      },
    ],
  },
  {
    category: "User Management",
    details: [
      {
        name: "Users",
        img: customers,
        path: "users",
      },
      {
        img: delivery,
        name: "Deposits",
        path: "all-deposits",
      },
      // {
      //   img: Wallet,
      //   name: "wallet address",
      //   path: "wallet-address",
      // },
      {
        img: imageFive,
        name: "withdrawals",
        path: "all-withdrawals",
      },
    ],
  },
  {
    category: "Settings",
    details: [
      // {
      //   name: "Update Profile",
      //   img: user,
      //   path: "update_profile",
      // },
      {
        name: "Logout",
        img: settings,
        path: "auth/login",
      },
    ],
  },
];

export const pages = [
  {
    name: "Contact Us",
    img: contact,
    path: "contact_us",
  },
  {
    name: "About Us",
    img: about,
    path: "about_us",
  },
  {
    name: "Privacy policy",
    img: <MdOutlinePrivacyTip color="var(--secondary-color)" size={28} />,
    path: "privacy_policy",
  },
  {
    name: "Terms of service",
    img: <RiTerminalWindowFill color="var(--secondary-color)" size={28} />,
    path: "terms",
  },
];
