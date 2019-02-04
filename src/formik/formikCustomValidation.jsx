import React from 'react';
import { withFormik, Form, Field } from 'formik';
import { Debug } from './Debug';
import { Button, Row, Col } from 'react-bootstrap';

const formikEnhancer = withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({fname:'',lname:'', accept: false}),
    validate: values  => {
        let errors = {};
        if(!values.fname) {
            errors.fname = `first name is required`;
        }
        if(!values.lname) {
            errors.lname = `last name is required`;
        }
        if(!values.accept) {
            errors.accept = 'Accpet terms and conditions';
        }
        return errors
    },
    handleSubmit: (values, action) => {
        action.setSubmitting(false);
    }
});

const formikCustomValidation = (props) =>{
    console.log(props,"custom props");
    const {
        isSubmitting,
        handleReset,
        dirty,
        errors,
        touched,
    } = props;

    return (
        <React.Fragment>
            <div className="container">
                <h3>Simple Formik using custom validation</h3>
                <Form>
                    <Row>
                        <Col sm="4">
                            <div className="form-group">
                                <Field type="text" name="fname" className="form-control"  placeholder="Enter First Name" />
                                {
                                   touched && touched.fname && errors && errors.fname && <span style={{ color: 'red'}}>{errors.fname}</span>
                                }
                            </div>
                            <div className="form-group">
                                <Field type="text" name="lname" className="form-control" placeholder="Enter Last Name" />
                                {
                                   touched && touched.lname && errors && errors.lname && <span style={{ color: 'red'}}>{errors.lname}</span>
                                }
                            </div>
                            <div className="form-group">
                                <Field name="accept">
                                {
                                    
                                    ({ field , form: { touched, errors }}) =>
                                    <div>
                                        <input type="checkbox" checked={field.value} {...field} />
                                        <label htmlFor={`${field.name}`}>Terms and conditions</label>
                                        {
                                            touched[field.name] && errors[field.name] && <span style={{ color: 'red'}}>{errors[field.name]}</span>
                                        }
                                    </div>
                                }
                                </Field>
                            </div>
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
};

export default formikEnhancer(formikCustomValidation);