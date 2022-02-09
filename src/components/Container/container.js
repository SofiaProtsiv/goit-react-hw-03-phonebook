import PropTypes from "prop-types";
import style from "./container.module.css";

function Container({ children }) {
  return (
    <div className={style.container}>
      <div className={style.iphone}>
        <div className={style.frontcam}></div>
        <div className={style.speaker}></div>
        <div className={style.screen}>
          <div className={style.screenContent}>{children}</div>
        </div>
        <div className={style.homeBtn}></div>
      </div>
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
