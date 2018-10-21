import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom'
import { SignUpAuth } from '../../store/action/action'
import { connect } from 'react-redux'


class SignUp extends Component {
    constructor() {
        super()

        this.state = {
        }
    }

    loginPage() {
        this.props.history.push('/')
    }

    signUpAuth() {
        const { name,email,password,role } = this.state
        const obj = {
            name:name,
            email:email,
            password:password,
            role:role
        }
        this.props.SignUpMethod(obj)
    }

    render() {
        return (
            <div>
                {console.log(this.props.user)}
                <div className='header'>
                    <h1>SignUp</h1>
                </div>
                <div className='main-container'>
                    <div className='flex-box'>
                        <div className="field1">
                            SIGNUP
                    </div>
                        <div className="field1" onClick={this.loginPage.bind(this)}>
                            LOGIN
                    </div>
                        <div className='signUpDiv'>
                            <div className="sign-up">
                                SIGN UP HERE
                        </div>
                            <div className='input-fields'>
                                <input type='text' placeholder='Name*' onChange={(e) => this.setState({ name: e.target.value })} />
                                <br />
                                <span id='err' />
                            </div>
                            <div className='input-fields'>
                                <input type='email' placeholder='Email*' onChange={(e) => this.setState({email : e.target.value})} />
                                <br />
                                <span id='emailErr' />
                            </div>
                            <div className='input-fields'>
                                <input type='password' placeholder='Password*' onChange={(e) => this.setState({password : e.target.value})} />
                                <br />
                                <span id='passwordErr' />
                            </div>
                            <div className='radioBtn'>
                                <div>
                                    <input type='radio' value={'attendee'} onChange={() => this.setState({ role: 'attendee' })} name={'role'} />Attendee
                                </div>
                                <div>
                                    <input type='radio' value={'organizer'} onChange={() => this.setState({ role: 'organizer' })} name={'role'} />Organizer
                                </div>
                                <br />
                            </div>
                            <div className='input-fields'>
                                <button className='button' onClick={() => this.signUpAuth()}>Sign Up</button>
                            </div>
                            <div className='fields'>
                                <h5>Already Registered ?<button className='signuplink' onClick={this.loginPage.bind(this)}> Login now</button></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        user: state.authReducer.CURRENTUSER,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        SignUpMethod: (text) => {
            dispatch(SignUpAuth(text))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);


// export default SignUp;
