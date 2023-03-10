import { useState, useEffect } from 'react';
import { Contacts } from './Contacts/Contacts';
import { FormFild } from './FormFild/FormFild';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    const parsContacts = JSON.parse(savedContacts);
    if (parsContacts) {
      setContacts(prev => [...prev, ...parsContacts]);
    }
  }, []);

  useEffect(() => {
    setLocalStorage([...contacts]);
  }, [contacts]);

  const setLocalStorage = item => {
    localStorage.setItem('contacts', JSON.stringify(item));
  };

  const onHandleSubmit = (e, { resetForm }) => {
    const contactName = [];

    for (const contact of contacts) {
      contactName.push(contact.name.toLowerCase());
    }

    if (contactName.includes(e.name.toLowerCase())) {
      alert(`${e.name} is already in contacts list`);
      return;
    }
    const user = { ...e, id: nanoid() };
    setContacts(prev => [user, ...prev]);
    resetForm();
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deliteContact = id => {
    setContacts(prev => {
      const filteredState = prev.filter(contact => contact.id !== id);
      setLocalStorage(filteredState);
      return filteredState;
    });
  };

  const visiblContacts = getVisibleContacts();

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <h2>Phonebook</h2>
      <FormFild onSubmit={onHandleSubmit} />
      <h4>Contacts</h4>
      <Filter value={filter} onChange={changeFilter} />
      {contacts.length > 0 && (
        <Contacts contacts={visiblContacts} onDelite={deliteContact} />
      )}
    </div>
  );
};
