import { Link } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import LoginIcon from "@mui/icons-material/Login";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";

function MenuDropdown({ menu, setMenu, setIsAdmin }) {
  const [dropdownLinkClicked, setDropdownLinkClicked] = useState(false);
  console.log("dropdownLinkClicked :>> ", dropdownLinkClicked);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAdmin(false);
    swal({
      text: "Thank you for shopping with us!",
    });
    navigate("/products");
  };

  const menuOptions = [
    {
      title: "Home",
      path: "/products",
      cName: "dropdown-link",
      icon: <HomeOutlinedIcon />,
    },
    {
      title: "Cart",
      path: "/cart",
      cName: "dropdown-link",
      icon: <ShoppingCartCheckoutIcon />,
    },
    {
      title: "Contact Us",
      path: "/contactus",
      cName: "dropdown-link",
      icon: <ContactMailOutlinedIcon />,
    },
    {
      title: "Login",
      path: "/login",
      cName: "dropdown-link",
      icon: <LoginIcon />,
    },
    {
      title: "Logout",
      path: "/products",
      cName: "dropdown-link",
      icon: <LogoutIcon onClick={() => handleLogout()}/>,
    },
  ];

  return (
    <div
      className={
        menu ? "dropdown-container-active" : "dropdown-container-closed"
      }
    >
      <ul className="dropdown">
        {menuOptions.map((item, i) => {
          return (
            <li key={i}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setMenu(false)}
              >
                {item.icon} {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

//

export default MenuDropdown;
