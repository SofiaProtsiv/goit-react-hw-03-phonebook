import PropTypes from "prop-types";
import style from "./iconButton.module.css";

const IconButton = ({ children, onClick, ...allProps }) => (
  <button
    type="button"
    className={style.iconButton}
    onClick={onClick}
    {...allProps}
  >
    {children}
  </button>
);
IconButton.defaultProps = {
  onClick: () => null,
  children: null,
};
IconButton.protoTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  "aria-label": PropTypes.string.isRequired,
};
export default IconButton;
