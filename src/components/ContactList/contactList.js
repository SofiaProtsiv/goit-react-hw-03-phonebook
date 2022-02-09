import PropTypes from 'prop-types';
import style from './contactList.module.css';

function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul className={style.list}>
      {contacts.map(({ id, name, number }) => (
        <li className={style.item} key={id}>
          <p className={style.name}>
            {name}: <span className={style.number}>{number}</span>
          </p>
          <button
            className={style.button}
            type="button"
            onClick={() => onDeleteContact(id)}
            >
              Delete
            </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
