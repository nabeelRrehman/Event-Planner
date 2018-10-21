import React, { Component } from 'react';
import firebase from 'firebase'
import swal from 'sweetalert2'
import Container from '../../Container/container';
import Card from '../Cards/card';
import { connect } from 'react-redux'
import { NotGoingEvents } from '../../store/action/goingAction'


class NotGoingEvent extends Component {
    constructor() {
        super()

        this.state = {
            events: [],
            notGoingEvents: []
        }
    }

    componentWillReceiveProps(props) {
        // const { notGoingEvents } = this.state

        const { events } = this.state
        if (this.props.userDetails !== props.userDetails) {
            const { getUserEvents, userDetails } = props
            getUserEvents(userDetails.userUid)
        }
        if (props.notgoings !== this.props.notgoings) {
            // console.log(props.notgoings,'not goings')
            this.setState({ notGoingEvents: props.notgoings })
        }
        if (props.card !== this.props.card) {
            console.log(props.card, 'card')
            props.card.map(items => {
                return (
                    props.notgoings.map(it => {
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

    componentDidMount() {
        // const { notGoingEvents } = this.state
        // if (notGoingEvents) {
        //     swal({
        //         showConfirmButton: false,
        //         timer: 100
        //     })
        // }
        // const user = localStorage.getItem('userUid')
    }

    render() {
        const { notGoingEvents, events } = this.state
        return (
            <Container logout={this.logout} profile_pic={this.props.profile_pic}>
                <h1>Not Going Events</h1>
                {
                    <Card color={'red'} shadow={'red'} attendee={true} Uevent={events} notgoings={notGoingEvents} />
                }
                {/* {
                    notGoingEvents.length === 0 &&
                    <h1 style={{ marginTop: '3em', color: 'red' }}>No Events Found!</h1>
                } */}
            </Container>
        )
    }
}


function mapStateToProps(state) {
    return ({
        userDetails: state.authReducer.USERDETAIL,
        event: state.authReducer.EVENTS,
        notgoings: state.rootReducer.NOTGOING,
        card: state.eventsReducer.CARD,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        getUserEvents: (text) => {
            dispatch(NotGoingEvents(text))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(NotGoingEvent);

// export default NotGoingEvent;
