import React,{useState,useEffect} from "react";
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList"; 
import { v4 as uuidv4 } from 'uuid';


function App() {
  const LOCAL_STORAGE_KEY="contacts";
  const [contacts,setContacts]=useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ??[]);
  const addContactHandler=(contact)=>{ 
    setContacts([...contacts, { id: uuidv4(), ...contact }]);
  }

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  // useEffect(()=>{
  //   const retriveContacts =JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if(retriveContacts) setContacts(retriveContacts);
  // },[contacts]);

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
  },[contacts]);
  return (
    <div className="ui container">
        <Header />
        <AddContact addContactHandler={addContactHandler}/>
        <ContactList contacts={contacts} getContactId={removeContactHandler}/>
    </div>
  );
}

export default App;
