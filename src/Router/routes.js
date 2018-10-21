import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';

import history from '../History/History'
import home from '../screens/home/home';
import login from '../screens/Login/login';
import SignUp from '../screens/Signup/signup';
import { OnAuth } from '../store/action/action'
import { CheckRole } from '../store/action/action'
import firebase from 'firebase'
import Role from '../Components/Role/role';
import Details from '../Components/EventCard/Details/details';
import Buy from '../Components/Buy/buy';
import GoingEvent from '../Components/goingEvents/going';
import NotGoingEvent from '../Components/notGoing/notGoing';
import { GoingEvents } from '../store/action/goingAction'
import { NotGoingEvents } from '../store/action/goingAction'
import { connect } from 'react-redux'
import { GettingEvents } from '../store/action/eventAction'
import { EventsAttendee } from '../store/action/eventAction'


class Routers extends Component {

    componentWillMount() {
        this.props.CheckUser()

    }

    componentWillReceiveProps(props) {
        const { CheckUserRole, userUid } = props
        const { getGoingEvents, userDetails, getNotGoingEvents, getEvents, getEventAttendee } = props

        // this.props.CheckUser()
        if (props.userUid !== this.props.userUid) {
            CheckUserRole(userUid.userUid)
            getGoingEvents(userUid.userUid)
            getNotGoingEvents(userUid.userUid)
        }
        // console.log(userDetails.userUid, 'userddd')
        if (this.props.userDetails !== userDetails) {
            if (userDetails) {
                if (userDetails.role === 'organizer') {
                    getEvents(userDetails.userUid)
                } else {
                    console.log('atte', userDetails)
                    getEventAttendee()
                }
            }
        }
        console.log('work')
        // console.log('user kitny milya', this.props.user)

    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={login} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route path='/home' component={home} />
                    <Route path='/role' component={Role} />
                    <Route path='/details/:id' component={Details} />
                    <Route path='/buy/:ticket' component={Buy} />
                    <Route path='/goingEvents' component={GoingEvent} />
                    <Route path='/notGoingEvents' component={NotGoingEvent} />
                </div>
            </Router>
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
        CheckUser: () => {
            dispatch(OnAuth())
        },
        CheckUserRole: (user) => {
            dispatch(CheckRole(user))
        },
        getGoingEvents: (user) => {
            dispatch(GoingEvents(user))
        },
        getNotGoingEvents: (user) => {
            dispatch(NotGoingEvents(user))
        },
        getEvents: (user) => {
            dispatch(GettingEvents(user))
        },
        getEventAttendee: () => {
            dispatch(EventsAttendee())
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Routers);
