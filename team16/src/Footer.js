import styled from "styled-components";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <footer>
            <h4>Made with ❤️ by Tekk Force</h4>
        </footer>
    );
};
const footer = styled(motion.div)`
  display: flex;
  justify-content: center;
  padding-top: 5rem;
  cursor: pointer;
  `;
  export default Footer;