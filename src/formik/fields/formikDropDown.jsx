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

const formikDropDown = enhance(({ 
   field,
   form,
   options,
   handleChange,
   handleBlur,
   disabled = false,
   placeholder,
   ...props
 }) => {
     const { name } = field;
     return(
        <React.Fragment>
            <h3>Drop Down</h3>
            <label>Items</label>
                <select
                    {...field}
                    disabled={disabled}
                    value={field.value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    {...props}
                    className="form-control"
                >
                    {
                        placeholder && <option value="">{placeholder}</option>
                    }
                    {
                        options && options.map(({ label }, key) => <option value={label} key={key}>{label}</option>)
                    }
                </select>
                <ErrorMessage name={name}>
                    {
                        msg => <div style={{ color: 'red'}}>{msg}</div>
                    }
                </ErrorMessage>
        </React.Fragment>
     )
});

export default formikDropDown;