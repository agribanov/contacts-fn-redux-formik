import contactsService from '../../contactsService';

export const fetchContacts = (payload) => async (dispatch) => {
    try {
        const { data } = await await contactsService.get();
        dispatch(setContacts(data));
    } catch (err) {
        console.warn('Contacts fetch error', err);
    }
};

// export const fetchContacts = (payload) => ({
//     type: CHANGE_CONTACT_ACTION,
//     payload,
// });

export const SET_CONTACTS_ACTION = 'SET_CONTACTS_ACTION';
export const setContacts = (payload) => ({
    type: SET_CONTACTS_ACTION,
    payload,
});

export const CHANGE_CONTACT_ACTION = 'CHANGE_CONTACT_ACTION';
const changeContact = async (contact, dispatch) => {
    try {
        const { data } = await contactsService.put(contact.id, contact);
        dispatch({
            type: CHANGE_CONTACT_ACTION,
            payload: data,
        });
        return data;
    } catch (err) {
        console.warn('Contact create error', err);
    }
};

export const ADD_CONTACT_ACTION = 'ADD_CONTACT_ACTION';
const addContact = async (contact, dispatch) => {
    try {
        const { data } = await contactsService.post('', contact);
        dispatch({ type: ADD_CONTACT_ACTION, payload: data });
        return data;
    } catch (err) {
        console.warn('Contact create error', err);
    }
};
export const saveContact = (contact) => (dispatch) => {
    console.log('save action', contact);
    return contact.id
        ? changeContact(contact, dispatch)
        : addContact(contact, dispatch);
};

export const DELETE_CONTACT_ACTION = 'DELETE_CONTACT_ACTION';
export const deleteContact = (payload) => async (dispatch) => {
    dispatch({
        type: DELETE_CONTACT_ACTION,
        payload,
    });

    try {
        await contactsService.delete(payload);
    } catch (err) {
        console.warn('Contact delete error', err);
    }
};
