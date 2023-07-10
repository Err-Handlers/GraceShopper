import { Link } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import LoginIcon from "@mui/icons-material/Login";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import { useState } from "react";

function MenuDropdown({ menu, setMenu, setIsAdmin, token, setToken }) {
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
      icon: <ContactSupportOutlinedIcon />,
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

        {token ? (
          <>
          <li>
            <Link to="Account" className="dropdown-link" onClick={() => setMenu(false)}>
              <AccountBoxOutlinedIcon /> Account
            </Link>
          </li>
          <li> <Link
                  className="dropdown-link"
                  to="/products"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setToken("");
                    setIsAdmin(false);
                    setMenu(false);
                    swal({
                      text: "Thank you for shopping with us!",
                    });
                  }}
                >
                 <LogoutIcon /> Logout
                </Link></li>
          </>
        ) : (
          <li>
          <Link to="/login" className="dropdown-link" onClick={() => setMenu(false)}>
            <LoginIcon /> Login
          </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

//

export default MenuDropdown;
