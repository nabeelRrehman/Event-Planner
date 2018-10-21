import React, { Component } from 'react';
import './login.css'
import Facebook from '../../Assets/images/facebook.png'
import Google from '../../Assets/images/google.png'
import { connect } from 'react-redux'
import { SignInAuth } from '../../store/action/action'
import { fbAuth } from '../../store/action/action'
import { googleAuth } from '../../store/action/action'
import firebase from 'firebase'

const fb_provider = new firebase.auth.FacebookAuthProvider()

const google_provider = new firebase.auth.GoogleAuthProvider()

class Login extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    //initially get the user from localstorage
    // Login page JSX

    signupPage() {
        this.props.history.push('/signup')
    }

    login() {
        const { email, password } = this.state
        const obj = {
            email: email,
            password: password
        }
        email && password && this.props.SignInMethod(obj)
    }

    fbLogin() {
        this.props.FBSignInMethod(fb_provider)
    }

    googleLogin() {
        this.props.GoogleSignInMethod(google_provider)
    }

    render() {
        return (
            <div>
                <div className='header'>
                    <h1>Login</h1>
                </div>
                <div className='main-container'>
                    <div className='flex-box'>
                        <div className="field1" onClick={this.signupPage.bind(this)}>
                            SIGNUP
                    </div>
                        <div className="field1">
                            LOGIN
                    </div>
                        <div className='signUpDiv'>
                            <div className="sign-up">
                                LOGIN HERE
                            </div>
                            <div className='input-fields'>
                                <input type='email' placeholder='Email*' onChange={(e) => this.setState({ email: e.target.value })} />
                            </div>
                            <div className='input-fields'>
                                <input type='password' placeholder='Password*' onChange={(e) => this.setState({ password: e.target.value })} />
                            </div>
                            <div className='input-fields'>
                                <button className='button' onClick={this.login.bind(this)} >Login</button>
                            </div>
                            <div className='fields'>
                                <h5>Sign In With?
                                </h5>
                                <button className='signuplink'>
                                    <img className='_image' onClick={() => this.fbLogin()} alt={'facebook'} src={Facebook} />
                                    <img className='_image' onClick={()=> this.googleLogin()} alt={'google+'} src={Google} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//set the state using redux

function mapStateToProps(state) {
    return ({
        user: state.authReducer.CURRENTUSER,
        profile_pic : state.authReducer.PROFILE_PIC,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        SignInMethod: (text) => {
            dispatch(SignInAuth(text))
        },
        FBSignInMethod: (text) => {
            dispatch(fbAuth(text))
        },
        GoogleSignInMethod: (text) => {
            dispatch(googleAuth(text))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);