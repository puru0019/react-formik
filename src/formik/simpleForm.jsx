import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button, Row, Col } from 'react-bootstrap';
import { Debug } from './Debug';
import * as Yup from 'yup';

const validateFormikFields = Yup.object().shape({
    email: Yup.string().email('Not Valid').required('Required'),
    fname: Yup.string().min(2, 'To short').max(10, 'To Long').required('Required'),
    lname: Yup.string().required('Required'),
});

class simpleForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            fname: '',
            email: '',
            lname: '',
        }
    }
    
    render() {
        
        return (
            <div className="container">
                <Formik
                    initialValues = {{ ...this.state }}
                    onSubmit = {
                        (values, action) => {
                            console.log(values,action)
                            action.setSubmitting(false);
                        }
                    }
                    validationSchema = {validateFormikFields}
                >
                {
                    ({ isSubmitting, dirty }) =>
                <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col sm={4}>
                    <div className="form-group">
                    <label>Email</label>
                    <Field type="email" name="email" className="form-control" />
                    <ErrorMessage name="email">
                     {
                         msg => <div style={{color:'red'}}>{msg}</div>
                     }
                    </ErrorMessage>
                    <label>First Name</label>
                    <Field type="text" name="fname" className="form-control" />
                    <ErrorMessage name="fname">
                     {
                         msg => <div style={{color:'red'}}>{msg}</div>
                     }
                    </ErrorMessage>
                    <label>Last Name</label>
                    <Field type="text" name="lname" className="form-control"  />
                    <ErrorMessage name="lname">
                     {
                         msg => <div style={{color:'red'}}>{msg}</div>
                     }
                    </ErrorMessage>
                    <br/>
                    <Button type="submit" disabled={isSubmitting || !dirty}>Submit</Button>
                    
                    </div>
                </Col>
                <Col sm={4}>
                <Debug/>
                </Col>
                </Row>
                </Form>
                }
                </Formik>
            </div>
        )
    }
}

export default simpleForm;