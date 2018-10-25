import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Anonymous from '../Assets/images/user.png'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import firebase from 'firebase'

library.add(faHome)
library.add(faTicketAlt)

class Container extends Component {
    constructor() {
        super()

        this.state = {
            // profile_pic : ''
        }
        this.logout = this.logout.bind(this)
    }

    componentWillReceiveProps(props) {
        if (props.userDetails) {
            this.setState({ profile_pic: props.userDetails.profile_pic })
        }
    }

    logout() {
        // firebase.auth().signOut()
    }

    render() {
        const { profile_pic } = this.state
        return (
            <div>
                <div className='homepage'>
                    <div className='home-icon'>
                        <Link to='/home' style={{ color: 'white' }}><FontAwesomeIcon icon='home' className='icon' /></Link>
                    </div>
                    <h1>Events</h1>
                    <div className='profile_pic_div'><img alt={'profile_pic'} className={'profile_pic'} src={profile_pic || Anonymous} /></div>
                    <div>
                        <button onClick={this.logout}>Logout</button>
                    </div>
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        user: state.authReducer.CURRENTUSER,
        userUid: state.authReducer.USERUID,
        userDetails: state.authReducer.USERDETAIL,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // SignInMethod: (text) => {
        //     dispatch(SignInAuth(text))
        // }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);

// export default Container
