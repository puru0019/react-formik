import React from 'react';
import { withFormik, Form, Field } from 'formik';
import { Debug } from './Debug';
import { Button, Row, Col } from 'react-bootstrap';

const formikEnhancer = withFormik({
    mapPropsToValues: () => ({fname:'',lname:''}),
    handleSubmit: (values, action) => {
        action.setSubmitting(false);
    }
});

const formikHocComponent = (props) =>{
    const {
        isSubmitting,
        handleReset,
        dirty,
    } = props;

    return (
        <React.Fragment>
            <div className="container">
                <h3>Simple Formik Using withFormik HOC</h3>
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

export default formikEnhancer(formikHocComponent);