import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { Link } from 'react-router-dom';

function ContactsListItem({ contact: { id, name, surname } }) {
    return (
        <ListItem button component={Link} to={`/form/${id}`}>
            <ListItemText primary={`${name} ${surname}`} />
        </ListItem>
    );
}

export default ContactsListItem;
