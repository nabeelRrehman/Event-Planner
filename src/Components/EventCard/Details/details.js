import React, { Component } from 'react';
import firebase from 'firebase'
import swal from 'sweetalert2'
import './details.css'
import { Link } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import Container from '../../../Container/container'
import { connect } from 'react-redux'
import { DetailEvent } from '../../../store/action/eventAction'


library.add(faTimesCircle)


class Details extends Component {
    constructor() {
        super()

        this.state = {
            totalSeats: [],
            totalReserved: []
        }
    }

    componentWillReceiveProps(props) {

        if (props.card) {
            this.setState({ event: props.card })
        }
        if (props.totalSeats) {
            this.setState({ totalSeats: props.totalSeats })
        }
        if (props.totalReserved) {
            this.setState({ totalReserved: props.totalReserved })
        }

    }

    componentDidMount() {
        const { userDetails, eventDetails } = this.props
        const { totalSeats, totalReserved } = this.state
        const { id } = this.props.match.params
        if (userDetails) {
            if (userDetails.role) {
                console.log(userDetails.role, 'userdetails')
                this.setState({ role: userDetails.role })
            }
        }

        eventDetails(id)
    }

    render() {
        const { event, totalSeats, totalReserved, role } = this.state
        return (
            <Container logout={this.logout} profile_pic={this.props.profile_pic}>
                {
                    event &&
                    <div className='event-details'>
                        <div className='event-name'>
                            {event.name}
                            {
                                role === 'attendee' &&
                                totalSeats.length === totalReserved.length &&
                                <span className='event-closed'>
                                    <FontAwesomeIcon icon='times-circle' /> Sold Out
                                </span>
                            }
                        </div>
                        <div className='siting-arrange'>
                            <div>
                                Siting arrangement:
                            </div>
                            <div>
                                {event.arrangement}
                            </div>
                            <div>
                                Start Time:
                            </div>
                            <div>
                                {event.startTime}
                            </div>
                            <div>
                                End Time:
                        </div>
                            <div>
                                {event.endTime}
                            </div>
                            <div>
                                {
                                    role === 'attendee' ?
                                        'Seats/Left:' :
                                        'Seats'
                                }
                            </div>
                            <div>
                                {
                                    role === 'attendee' ?
                                        `${totalSeats.length}/${totalSeats.length - totalReserved.length}` :
                                        `${totalSeats.length}`

                                }

                            </div>
                            <div>
                                Price Per Ticket:
                        </div>
                            <div>
                                {event.price ? event.price : 'free'}
                            </div>
                        </div>
                        <div className='event-pic'>
                            <img src={event.image} width={'100%'} height={'100%'} />
                        </div>
                        <div className='ticket-detail'>
                            <div>
                                Details:
                        </div>
                            <div>
                                {event.detail}
                            </div>
                            <div>
                                Address:
                        </div>
                            <div>
                                {event.address}
                            </div>
                            <div>
                                Location:
                        </div>
                            <div>
                                {event.location}
                            </div>
                            <div>
                                Ticket:
                        </div>
                            <div>
                                {event.ticket}
                            </div>
                        </div>
                        {
                            role === 'attendee' &&
                            (
                                totalSeats.length === totalReserved.length ?
                                    <div className='event-detail-btn'>
                                        <button disabled={'disabled'} style={{ opacity: '0.5' }}>SOLD</button>
                                    </div>
                                    :
                                    <div className='event-detail-btn'>
                                        <Link className='buyBtn' to={`${'/buy/'}${event.key}`} style={{ color: 'white', textDecoration: 'none' }}>Buy</Link>
                                    </div>
                            )
                        }
                    </div>
                }
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return ({
        userDetails: state.authReducer.USERDETAIL,
        card: state.eventsReducer.CARD,
        totalSeats: state.eventsReducer.TOTALSEATS,
        totalReserved: state.eventsReducer.TOTALRESERVED,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        eventDetails: (id) => {
            dispatch(DetailEvent(id))
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);

// export default Details