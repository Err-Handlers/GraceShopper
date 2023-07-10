import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import CopyrightIcon from "@mui/icons-material/Copyright";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div>
        <CopyrightIcon /> 2022 Err Handlers
      </div>
      <ul className="social-icons">
        <li><InstagramIcon sx={{fontSize: 30}}/></li>
        <li><FacebookIcon sx={{fontSize: 30}}/></li>
        <li><TwitterIcon sx={{fontSize: 30}}/></li>
      </ul>
    </footer>
  );
};

export default Footer;
