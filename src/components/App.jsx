// import { useEffect, useState } from 'react';
import Form from './Form/Form';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { getError, getIsLoading } from 'redux/selector';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';

export default function App() {
  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h1>Phonebook</h1>
      <Form />
      <h2>Contacts</h2>
      {isLoading && !error && <b>Request in progress...</b>}
      <Filter />
      <ContactList />
    </>
  );
}
