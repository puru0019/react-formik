import React from 'react';
import { compose } from 'recompose';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import { Debug } from './Debug';
import { Button, Row, Col } from 'react-bootstrap';
import formikSelect from './fields/formikSelect';
import * as Yup from "yup";
import formikRadio from './fields/formikRadio';
import formikCheckBox from './fields/formikCheckBox';

const options = [
    { value: 'Food', label: 'Food' },
    { value: 'Being Fabulous', label: 'Being Fabulous' },
    { value: 'Ken Wheeler', label: 'Ken Wheeler' },
    { value: 'ReasonML', label: 'ReasonML' },
    { value: 'Unicorns', label: 'Unicorns' },
    { value: 'Kittens', label: 'Kittens' },
  ];

  const options1 = [
    { value: 'red', label: 'Red' },
    { value: 'orange', label: 'Orange' },
    { value: 'white', label: 'White' },
    { value: 'green', label: 'Green' },
  ];

  const options2 = [
    { id: 'pink', label: 'Pink' },
    { id: 'yellow', label: 'Yellow' },
    { id: 'blue', label: 'Blue' },
    { id: 'black', label: 'Black' },
  ];

const formikEnhancer = withFormik({
    enableReinitialize: true,
    // By default validateOnChange and validateOnBlur are set to true 
    // validateOnChange: false,
    // validateOnBlur: false,
    validationSchema: Yup.object().shape({
        accept: Yup.bool().test('accept','Terms and conditions are required', value => value === true),
        topics: Yup.array().required('Topics is required').min(3, 'should select at least 3 items').of(
            Yup.object().shape({
                label: Yup.string().required(),
                value: Yup.string().required()
            })
        ),
        color: Yup.string().required('Please select Color'),
        colors: Yup.array().required('Colors is required').min(2, 'should select atleast 2 items'),
    }),
    mapPropsToValues: () => ({ topics:[],accept: false, color: "", colors: [] }),
    handleSubmit: (values, action) => {
        alert(JSON.stringify(values, null, 2));
        action.setSubmitting(false);
    }
});
const enhance = compose(
    formikEnhancer,
);

// const validateSelect = value => {
//     let error;
//     if(value.length === 0) {
//         error = "Topics is required";
//     } else if(value.length <= 2) {
//         error = "should select at least 3 items";
//     } 
//     return error;
// }


const customFields = enhance(({ ...props }) =>{
    const {
        isSubmitting,
        dirty,
        handleReset,
        values,
    } = props;

    return (
        <React.Fragment>
            <div className="container">
                <Form>
                    <Row>
                        <Col sm={6}>
                            <div className="form-group">
                                <h3>CheckBox</h3>
                                <Field name="accept">
                                {
                                    
                                    ({ field }) =>
                                    <div>
                                        <input type="checkbox" checked={field.value} {...field} />
                                        <label htmlFor={`${field.name}`}>Terms and conditions</label>
                                        <ErrorMessage name={`${field.name}`}>
                                            {
                                                msg => <div style={{ color: 'red'}}>{msg}</div>
                                            }
                                        </ErrorMessage>
                                    </div>
                                }
                                </Field>
                                <Field name="topics" component={formikSelect} options={options} value={values.topics}/>
                                <Field name="color" component={formikRadio} options={options1} /> 
                                <Field name="colors" component={formikCheckBox} options={options2} />
                                <Button color="success" type="submit" disabled={isSubmitting || !dirty} style={{marginRight:"10px", marginTop:"20px"}}>Submit</Button>
                                <Button color="grey" disabled={isSubmitting || !dirty} onClick={handleReset} style={{marginRight:"10px", marginTop:"20px"}}>Reset</Button>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <Debug />
                        </Col>
                    </Row>
                </Form> 
            </div>
        </React.Fragment>
    )
});

export default customFields;