import React from 'react';
import { compose,  } from 'recompose';
import { Formik, Form, Field } from 'formik';
import { Debug } from './Debug';
import { Button, Row, Col } from 'react-bootstrap';

const formInitialValues = {fname: '', lname: ''};

const enhance = compose();

const FormikComponent = enhance(() => {
    return (
        <React.Fragment>
            <Formik
            initialValues={{ ...formInitialValues }}
            onSubmit={ (values, action) => {
                console.log(values,action);
                action.setSubmitting(false);
            }}
            >
                {
                    ({ isSubmitting, dirty }) => 
                    <div className="container">
                       <h3>Simple Formik</h3>
                       <Form>
                           <Row>
                           <Col sm="4">
                            <div className="form-group">
                                <Field type="text" name="fname" className="form-control" placeholder="Enter First Name" />
                            </div>
                            <div className="form-group">
                                <Field type="text" name="lname" className="form-control" placeholder="Enter Last Name" />
                            </div>
                           </Col>
                           </Row>
                           <Button color="Success" type="submit" disabled={isSubmitting || !dirty}>Submit</Button>
                           <Debug />
                       </Form> 
                    </div>
                    
                }
            </Formik>
        </React.Fragment>
    )
});

export default FormikComponent