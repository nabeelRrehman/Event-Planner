import React, { Component } from 'react';
import firebase from 'firebase'
import swal from 'sweetalert2'
import Container from '../../Container/container';
// import Card from '../Cards/card';
import { connect } from 'react-redux'
import { GoingEvents } from '../../store/action/goingAction'
import Card from '../Cards/card';


class GoingEvent extends Component {
    constructor() {
        super()

        this.state = {
            events : [],
            goingEvents: []
        }

        this.gettingEvent = this.gettingEvent.bind(this)
    }

    componentDidMount() {
        const props = this.props

        this.gettingEvent(props)
    }

    componentWillReceiveProps(props) {
        // console.log(props.userDetails, 'updated')
        // console.log(this.props.userDetails, 'previous')
        this.gettingEvent(props)        
    }

    gettingEvent(props) {
        const { events } = this.state
        if (this.props.userDetails !== props.userDetails) {
            const { getGoingEvents, userDetails } = props
            getGoingEvents(userDetails.userUid)
        }
        if (props.goings !== this.props.goings) {
            // console.log(props.goings)
            this.setState({ goingEvents: props.goings })
        }
        if (props.card !== this.props.card) {
            // console.log(props.card, 'card')
            props.card &&
            props.card.map(items => {
                return (
                    props.goings.map(it => {
                        items.key === it &&
                            events.indexOf(items) === -1 &&
                            events.push(items) &&
                            this.setState({ events }, () => {
                                console.log(this.state.events)
                            })
                    })
                )
            })
        }
    }


    render() {
        const { goingEvents, events } = this.state
        return (
            <Container logout={this.logout} profile_pic={this.props.profile_pic}>
                <h1>Going Events</h1>
                {
                    <Card color={'green'} shadow={'green'} attendee={true} Uevent={events} goings = {goingEvents}/>
                }
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return ({
        userDetails: state.authReducer.USERDETAIL,
        goings: state.rootReducer.GOING,
        card: state.eventsReducer.CARD,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        getGoingEvents: (text) => {
            dispatch(GoingEvents(text))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(GoingEvent);
