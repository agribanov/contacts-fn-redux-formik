import List from '@material-ui/core/List';
import React from 'react';
import { connect } from 'react-redux';

import ContactsListItem from './ContactsListItem';

function ContactsList({ contacts, onSelect }) {
    return (
        <List>
            {contacts.map((contact) => (
                <ContactsListItem
                    contact={contact}
                    key={contact.id}
                    onSelect={onSelect}
                ></ContactsListItem>
            ))}
        </List>
    );
}

const mapStateToProps = ({ contacts }) => ({
    contacts,
});

export default connect(mapStateToProps)(ContactsList);
