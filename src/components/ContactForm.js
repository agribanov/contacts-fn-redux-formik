import React from 'react';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { deleteContact, saveContact } from '../store/actions/actions';
import FormikTextField from './FormikTextField';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        width: '100%',
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    title: {
        marginBottom: theme.spacing(2),
    },
    formFooter: {
        marginTop: theme.spacing(2),
    },
    formButton: {
        marginRight: theme.spacing(2),
    },
}));

const validationSchema = yup.object().shape({
    name: yup.string().required().min(2).max(200),
    surname: yup.string().required().min(2).max(200),
    phone: yup.string().required().min(6).max(10),
});

function ContactForm({ contact, saveContact, deleteContact }) {
    const classes = useStyles();
    const history = useHistory();

    const onSubmit = async (contact) => {
        const { id } = await saveContact(contact);

        history.push(`/form/${id}`);
    };

    const onDelete = async () => {
        await deleteContact(contact.id);

        history.push(`/form/new`);
    };

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container justify="center">
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography
                            className={classes.title}
                            component="h1"
                            variant="h4"
                            align="center"
                        >
                            Contact Form
                        </Typography>
                        <Formik
                            enableReinitialize
                            initialValues={contact}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            <Form>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <FormikTextField
                                            fullWidth
                                            name="name"
                                            label="Name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormikTextField
                                            fullWidth
                                            name="surname"
                                            label="Surname"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormikTextField
                                            fullWidth
                                            name="phone"
                                            label="Phone"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    spacing={3}
                                    className={classes.formFooter}
                                    justify="flex-end"
                                >
                                    <Grid item xs={12} md={6} align="right">
                                        <Button
                                            type="button"
                                            variant="contained"
                                            color="secondary"
                                            className={classes.formButton}
                                            startIcon={<DeleteIcon />}
                                            onClick={onDelete}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className={classes.formButton}
                                            startIcon={<SaveIcon />}
                                        >
                                            Save
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        </Formik>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

const mapStateToProps = (
    { contacts },

    { match: { params } }
) => {
    console.log('props', params.id);
    let contact = contacts.find((el) => el.id === params.id);

    contact = contact || {
        name: '',
        surname: '',
        phone: '',
    };

    return { contact };
};

const mapDispatchToProps = {
    saveContact,
    deleteContact,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ContactForm)
);
