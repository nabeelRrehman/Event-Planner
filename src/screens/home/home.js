import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import './home.css'
import firebase from 'firebase'
import swal from 'sweetalert2'
import Container from '../../Container/container';
import { CheckRole } from '../../store/action/action'
import History from '../../History/History';
import Organizer from '../Roles/Organizer/organizer';
import Attendee from '../Roles/Attendee/attendee';

class Home extends Component {
    constructor() {
        super()

        this.state = {
        }
    }

    logout() {
        // firebase.auth().signOut()
    }

    componentDidMount() {
        this.props.CheckUserRole()
        setTimeout(() => {
            const { userUid } = this.props
            if (userUid) {
                this.props.CheckUserRole(userUid.userUid)
            }
        }, 4000)
    }

    componentWillReceiveProps(props) {
        const { userDetails } = props
        if (userDetails) {
            // console.log(userDetails)
            userDetails.role ?
                this.setState({ role: userDetails.role }) :
                History.push('/role')
            // this.setState({role : 1})
        } else {
        }

    }

    render() {
        const { role } = this.state
        return (
            <Container logout={this.logout}>
                {role === 'attendee' && <Attendee />}
                {role === 'organizer' && <Organizer />}
            </Container>
        )
    }
}

//no used

function mapStateToProps(state) {
    return ({
        user: state.authReducer.CURRENTUSER,
        userUid: state.authReducer.USERUID,
        userDetails: state.authReducer.USERDETAIL,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        CheckUserRole: (text) => {
            dispatch(CheckRole(text))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// export default Home