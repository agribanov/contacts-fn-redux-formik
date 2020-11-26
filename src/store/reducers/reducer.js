import {
    SET_CONTACTS_ACTION,
    DELETE_CONTACT_ACTION,
    ADD_CONTACT_ACTION,
    CHANGE_CONTACT_ACTION,
} from '../actions/actions';

const initialState = {
    contacts: [],
    selectedContact: getEmptyContact(),
};

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case SET_CONTACTS_ACTION:
            return { ...state, contacts: payload };
        case DELETE_CONTACT_ACTION:
            return {
                ...state,
                contacts: state.contacts.filter((el) => el.id !== payload),
                selectedContact: getEmptyContact(),
            };
        case ADD_CONTACT_ACTION:
            return {
                ...state,
                contacts: [...state.contacts, payload],
                selectedContact: payload,
            };
        case CHANGE_CONTACT_ACTION:
            return {
                ...state,
                contacts: state.contacts.map((el) =>
                    el.id !== payload.id ? el : payload
                ),
                selectedContact: payload,
            };
        default:
            return state;
    }
}

function getEmptyContact() {
    return {
        // age: 33,
        name: '',
        surname: '',
        phone: '',
    };
}
