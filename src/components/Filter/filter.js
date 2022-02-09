import PropTypes from "prop-types";
import style from "./filter.module.css";

function Filter({ value, onChange }) {
  return (
    <label className={style.label}>
      Find contacts by name 🔎
      <input
        className={style.input}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default Filter;
