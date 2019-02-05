import React from 'react';
import { ErrorMessage } from 'formik';
import { compose, withHandlers } from 'recompose';

const enhance = compose(
    withHandlers({
        handleChange: ({ form: { setFieldValue, values },  field }) => ({ target }) => {
            let valueArray = [...values[field.name]] || [];
            if(target.checked) {
                valueArray = [...values[field.name], target.value]
            } else {
                valueArray.splice(valueArray.indexOf(target.value),1);
            }
            setFieldValue(field.name, valueArray);
        },
    })
);

const formikCheckBoxGroup = enhance(({ 
   field: { name },
   form: { setFieldTouched, values },
   options,
   handleChange,
 }) => {
     return(
        <React.Fragment>
            <h3>CheckBox Group</h3>
            {
                options.map(({ label, id },key) =>
                
                <div key={key} >
                    <label>
                        <input 
                            type="checkbox"
                            value={id}
                            checked={values[name].includes(id)}
                            onChange={handleChange}
                            onBlur={() => setFieldTouched(name, true)}
                        />
                        {label}
                    </label>
                </div>
                )
            }
            <ErrorMessage name={name}>
                {
                    msg => <div style={{ color: 'red'}}>{msg}</div>
                }
            </ErrorMessage>
        </React.Fragment>
     )
});



export default formikCheckBoxGroup;