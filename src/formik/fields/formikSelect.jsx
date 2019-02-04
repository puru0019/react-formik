import React from 'react';
import { ErrorMessage } from 'formik';
import { compose, withHandlers } from 'recompose';
import Select from 'react-select';
import '../../../node_modules/react-select/dist/react-select';

const enhance = compose(
    withHandlers({
        handleChange: ({ form: { setFieldValue },  field }) => (value) => {
            setFieldValue(field.name, value);
        },
        handleBlur: ({ form: { setFieldTouched },  field }) => () => {
            setFieldTouched(field.name, true);
        }
    })
);

const formikSelect = enhance(({ 
   value,
   field: { name },
   options,
   handleChange,
   handleBlur, 
 }) => {
     //console.log(form)
     return(
        <React.Fragment>
            <h3>Auto Complete</h3>
            <label htmlFor="color">Topics</label>
                <Select
                    id="color"
                    options={options}
                    isMulti={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={value}
                />
                <ErrorMessage name={name}>
                    {
                        msg => <span style={{ color: 'red'}}>{msg}</span>
                    }
                </ErrorMessage>
        </React.Fragment>
     )
});

export default formikSelect;