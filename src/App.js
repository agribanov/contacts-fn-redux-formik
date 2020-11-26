// import React, { useEffect } from 'react';
// import contactsService from './contactsService';
// import './App.css';

// import ContactsList from './components/contactsList/ContactsList';
// import ContactForm from './components/contactForm/ContactForm';
// import { connect } from 'react-redux';
// import { setContacts, changeContact, addContact, setSelectedContact, resetSelectedContact, deleteContact } from './store/actions/actions';

// function App({contacts,
//             selectedContact,
//             setContacts,
//             changeContact,
//             addContact,
//             setSelectedContact,
//             resetSelectedContact,
//             deleteContact}) {
//     useEffect(() => {
//         contactsService.get().then(({ data }) => setContacts(data));
//     }, []);

//     function onAddNewBtnClick() {
//         resetSelectedContact()
//     }

//     function onDelete({id}) {
//         contactsService.delete(id);
//         deleteContact(id)
//     }

//     function onSave(contact) {
//         if (contact.id) {
//             updateContact(contact);
//         } else {
//             createContact(contact);
//         }
//     }

//     function createContact(contact) {
//         contactsService.post('', contact).then(({ data }) => {
//             addContact(data);
//         });
//     }

//     function updateContact(contact) {
//         contactsService.put(contact.id, contact);
//         changeContact(contact)
//     }

//     return (
//         <>
//             <header className="App-header">Contacts App</header>
//             <div className="left-panel">
//                 <ContactsList
//                     contacts={contacts}
//                     onSelect={setSelectedContact}
//                 ></ContactsList>
//                 <button
//                     onClick={onAddNewBtnClick}
//                     className="add-new-contact-btn"
//                 >
//                     Add new
//                 </button>
//             </div>
//             <div className="right-panel">
//                 <ContactForm
//                     key={selectedContact.id}
//                     contact={selectedContact}
//                     onDelete={onDelete}
//                     onSave={onSave}
//                 ></ContactForm>
//             </div>
//         </>
//     );
// }

// function mapStateToProps(state){
//     return state
// }

// const mapDispatchToProps = {
//     setContacts,
//     changeContact,
//     addContact,
//     setSelectedContact,
//     resetSelectedContact,
//     deleteContact
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import theme from './theme';
import Header from './components/Header';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchContacts } from './store/actions/actions';
import ContactForm from './components/ContactForm';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
}));

function App({ fetchContacts }) {
    const classes = useStyles();
    const [sidebarOpened, setSidebarOpened] = useState(false);

    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]);

    const toggleSidebar = () => setSidebarOpened(!sidebarOpened);

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className={classes.root}>
                    <Header
                        sidebarOpened={sidebarOpened}
                        toggleSidebar={toggleSidebar}
                    />
                    <Sidebar
                        sidebarOpened={sidebarOpened}
                        toggleSidebar={toggleSidebar}
                    />
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Switch>
                            <Route path="/form/:id" component={ContactForm} />
                            <Route path="*">
                                <Redirect to="/form/new" />
                            </Route>
                        </Switch>
                    </main>
                </div>
            </ThemeProvider>
        </Router>
    );
}

const mapDispatchToProps = {
    fetchContacts,
};

export default connect(null, mapDispatchToProps)(App);
