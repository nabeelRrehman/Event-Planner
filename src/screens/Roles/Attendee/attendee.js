import React, { Component } from 'react';
import './attendee.css'
import firebase from 'firebase'
import EventCard from '../../../Components/EventCard/eventCards/eventCard';
import { Link } from 'react-router-dom';
import { GetEvent } from '../../../store/action/action'
import { connect } from 'react-redux'


class Attendee extends Component {
    constructor() {
        super()

        this.state = {
            events:[]
        }
    }

    componentWillMount() {
        const { getUserEvents } = this.props
        getUserEvents()

    }

    componentWillReceiveProps(props) {
        const { event } = props
        // console.log(events)
            this.setState({ events : event },()=>{
                // console.log(this.state.events)
            })
    }

    render() {
        const { events } = this.state
        // console.log(events)
        return (
            <div>
                <div>
                    <h1 value='abc'>All Event</h1>
                </div>
                <div className='userInterest'>
                    <div>
                        <Link to='/goingEvents' className='going'>Going</Link>
                    </div>
                    <div>
                        <Link to='/notGoingEvents' className='notgoing'>Not Going</Link>
                    </div>
                </div>
                {
                    <EventCard attendee={true} />
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        userDetails: state.authReducer.USERDETAIL,
        event: state.authReducer.EVENTS,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        getUserEvents: (text) => {
            dispatch(GetEvent(text))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Attendee);

