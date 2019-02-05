import React from 'react';
import { ErrorMessage } from 'formik';
import { compose, withHandlers } from 'recompose';

const enhance = compose(
    withHandlers({
        handleChange: ({ form: { setFieldValue },  field }) => ({ target }) => {
            setFieldValue(field.name, target.value);
        },
        handleBlur: ({ form: { setFieldTouched },  field }) => () => {
            setFieldTouched(field.name, true);
        }
    })
);

const formikRadioGroup = enhance(({ 
   field: { name },
   form,
   options,
   handleChange,
   handleBlur, 
 }) => {
     console.log(form.errors, name)
     return(
        <React.Fragment>
            <h3>Radio Button Group</h3>
            {
                options.map(({ label, value },key) =>
                <div key={key} >
                    <label>
                        <input 
                            type="radio"
                            value={value}
                            checked={form.values[name] === value}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {label}
                    </label>
                </div>
                )
            }
            <ErrorMessage name={name}>
                {
                    msg => <span style={{ color: 'red'}}>{msg}</span>
                }
            </ErrorMessage>
        </React.Fragment>
     )
});

export default formikRadioGroup;