import PropTypes from "prop-types";
import { PureComponent } from "react/cjs/react.production.min";
import { createPortal } from "react-dom";
import style from "./modal.module.css";

const modalRoot = document.querySelector("#modal-root");

class Modal extends PureComponent {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.code === "Escape") {
      this.props.onClose();
    }
  };
  handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className={style.modalBackdrop} onClick={this.handleBackdropClick}>
        <div className={style.modalContent}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
