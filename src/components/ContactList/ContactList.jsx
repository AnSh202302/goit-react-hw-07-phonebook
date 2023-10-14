import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { getContacts, getFilter } from 'redux/selector';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const getVisibleName = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase(normalizedFilter))
    );
  };
  const contactsArr = getVisibleName();

  return (
    <ul>
      {contactsArr.map(({ name, id, phone }) => (
        <li key={id}>
          {name}: {phone}
          <button type="button" onClick={() => dispatch(deleteContact(id))}>
            X
          </button>
        </li>
      ))}
    </ul>
  );
};
ContactList.propTypes = {
  contactsArr: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteUser: PropTypes.func,
};
