import React from 'react';
import { compose, withHandlers } from 'recompose';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import { Debug } from './Debug';
import { Button, Row, Col } from 'react-bootstrap';

const formikEnhancer = withFormik({
    enableReinitialize: true,
    // By default validateOnChange and validateOnBlur are set to true 
    // validateOnChange: false,
    // validateOnBlur: false,
    validate: values  => {
        let errors = {};
        if(!values.lname) {
            errors.lname = `last name is required`;
        }
        if(!values.accept) {
            errors.accept = 'Accpet terms and conditions';
        }
        return errors
    },
    mapPropsToValues: () => ({fname:'',lname:'', accept: false, username: ''}),
    handleSubmit: (values, action) => {
        console.log(action);
        if(values.username === "user") {
            action.setFieldError("username", "Please enter another name");
            action.setFieldValue("username", "admin1", true);
        }
        action.setSubmitting(false);
    }
});
const enhance = compose(
    formikEnhancer,
    withHandlers({
        validateAllFields : ({ setErrors, setFieldTouched }) => async(validateForm) => {
            const errors = await validateForm();
            if(errors) {
                setFieldTouched("fname");
                setFieldTouched("lname");
                setFieldTouched("accept");
                setErrors(errors);
            }
        }
    }),
);

const validateFirstName = value => {
    let error;
    if(!value) {
        error = "First name is required"
    } else if(value.length <= 3) {
        error = "First name should atleast have 4 characters"
    }
    return error
}

const validateUserName = value => {
    let error;
    if(value === 'admin') {
        error = 'Not Valid User';
    }
    return error;
}

const formikFieldAndFormLevelValidation = enhance(({ validateAllFields, ...props}) =>{
    console.log(props,validateAllFields);
    const {
        isSubmitting,
        handleReset,
        dirty,
        validateField,
        validateForm,
    } = props;

    return (
        <React.Fragment>
            <div className="container">
                <h3>Simple Formik using custom validation</h3>
                <Form>
                    <Row>
                        <Col sm="4">
                            <div className="form-group">
                                <Field type="text" name="fname" className="form-control"  validate={validateFirstName} placeholder="Enter First Name" />
                                <ErrorMessage name="fname">
                                    {
                                        msg => <span style={{ color: 'red'}}>{msg}</span>
                                    }
                                </ErrorMessage>
                            </div>
                            <div className="form-group">
                                <Field type="text" name="lname" className="form-control" placeholder="Enter Last Name" />
                                <ErrorMessage name="lname">
                                    {
                                        msg => <span style={{ color: 'red'}}>{msg}</span>
                                    }
                                </ErrorMessage>
                            </div>
                            <div className="form-group">
                                <Field type="text" name="username" className="form-control" validate={validateUserName} placeholder="Enter User Name" />
                                <ErrorMessage name="username">
                                    {
                                        msg => <span style={{ color: 'red'}}>{msg}</span>
                                    }
                                </ErrorMessage>
                            </div>
                            <div className="form-group">
                                <Field name="accept">
                                {
                                    
                                    ({ field }) =>
                                    <div>
                                        <input type="checkbox" checked={field.value} {...field} />
                                        <label htmlFor={`${field.name}`}>Terms and conditions</label>
                                        <ErrorMessage name={`${field.name}`}>
                                            {
                                                msg => <span style={{ color: 'red'}}>{msg}</span>
                                            }
                                        </ErrorMessage>
                                    </div>
                                }
                                </Field>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{marginBottom: "5px"}}>
                        <Col sm="3">
                        <Button color="success" onClick={() => validateField('username')}>Validate UserName</Button>
                        </Col>
                    </Row>
                    <Row style={{marginBottom: "5px"}}>
                        <Col sm="3">
                        <Button color="success" onClick={() => validateAllFields(validateForm)}>Validate All Fields</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="1">
                            <Button color="success" type="submit" disabled={isSubmitting || !dirty}>Submit</Button>
                        </Col>
                        <Col sm="1">
                            <Button color="grey" disabled={isSubmitting || !dirty} onClick={handleReset}>Reset</Button>
                        </Col>
                    </Row>
                    <Debug />
                </Form> 
            </div>
        </React.Fragment>
    )
});

export default formikFieldAndFormLevelValidation;