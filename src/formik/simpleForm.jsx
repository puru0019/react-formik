import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

function validateForm({ fname, email, lname }) {
    return {
        fname: !fname || fname.trim().length === 0 ? 'First name is required' : false,
        email: !email || email.trim().length === 0 ? 'Email name is required' : false,
        lname: !lname || lname.trim().length === 0 ? 'Last name is required' : false,
    }
}

class simpleForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            fname: 'gopi',
            email: 'kr@gmail.com',
            lname: 'raj',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }
    
    render() {
        const errors = validateForm(this.state);
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                <Row>
                    <Col sm={4}>
                    <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" value={this.props.email} onChange={this.handleChange} />
                    {
                        errors && errors.email && <div style={{color:'red'}}>{errors.email}</div>
                    }
                    <label>First Name</label>
                    <input type="text" name="fname" className="form-control" value={this.props.fname} onChange={this.handleChange} />
                    {
                        errors && errors.fname && <div style={{color:'red'}}>{errors.fname}</div>
                    }
                    <label>Last Name</label>
                    <input type="text" name="lname" className="form-control" value={this.props.lname} onChange={this.handleChange} />
                    {
                        errors && errors.lname && <div style={{color:'red'}}>{errors.lname}</div>
                    }
                    <br/>
                    <Button type="submit">Submit</Button>
                    </div>
                </Col>
                </Row>
                </form>
            </div>
        )
    }
}

export default simpleForm;