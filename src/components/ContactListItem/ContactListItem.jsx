import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact, editContact } from 'redux/operations';

export default function ContactListItem({ contact: { name, phone, id } }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editPhone, setEditPhone] = useState(phone);

  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditMode(prev => !prev);
  };
  useEffect(() => {
    if (!isEditMode && (name !== editName || phone !== editPhone)) {
      dispatch(
        editContact({
          id,
          name: editName,
          phone: editPhone,
        })
      );
      console.log(name);
      console.log(phone);
      console.log(editName);
      console.log(editPhone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode]);

  const handleChange = ({ target }) => {
    if (target.name === 'editName') {
      setEditName(target.value);
      return;
    }
    setEditPhone(target.value);
  };
  return (
    <li>
      {isEditMode ? (
        <>
          <input
            onChange={handleChange}
            type="text"
            name="editName"
            value={editName}
          ></input>
          <input
            onChange={handleChange}
            type="text"
            name="editPhone"
            value={editPhone}
          ></input>
        </>
      ) : (
        <>
          <span>{name}</span>:<span> {phone}</span>{' '}
        </>
      )}
      <button type="button" onClick={handleEdit}>
        {isEditMode ? 'Save' : 'Edit'}
      </button>
      <button type="button" onClick={() => dispatch(deleteContact(id))}>
        X
      </button>
    </li>
  );
}
