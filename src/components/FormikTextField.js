import TextField from '@material-ui/core/TextField';
import { useFormikContext } from 'formik';
import React from 'react';

function FormikTextField(props) {
    const {
        values,
        handleChange,
        handleBlur,
        touched,
        errors,
    } = useFormikContext();
    const { name } = props;

    return (
        <TextField
            {...props}
            value={values[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched[name] && Boolean(errors[name])}
            helperText={touched[name] && errors[name]}
        />
    );
}

export default FormikTextField;
