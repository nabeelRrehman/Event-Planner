import React, { Component } from 'react';
import './eventCard.css'
import firebase from 'firebase'
import swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Sold from '../../../Assets/images/sold.png'
import { UserInterest } from '../../../store/action/goingAction'
import { UserNotInterest } from '../../../store/action/goingAction'
import { GoingEvents } from '../../../store/action/goingAction'
import { NotGoingEvents } from '../../../store/action/goingAction'
import { connect } from 'react-redux'
import { GettingEvents } from '../../../store/action/eventAction'
import { EventsAttendee } from '../../../store/action/eventAction'


library.add(faTimesCircle)
library.add(faCheckCircle)


class EventCard extends Component {
    constructor() {
        super()

        this.state = {
            event: [],
            counter: 0,
            goings: [],
            notgoings: [],
            arr: [],
            reserved: [],
            totalSeatsLength: []
        }
    }

    componentDidMount() {
        const props = this.props
        this.fetchData(props)
    }

    componentWillReceiveProps(props) {
        // console.log('run')
        console.log(props.goings, 'hhhhhhhhhhhh')
        this.fetchData(props)
    }

    fetchData(props) {
        // console.log(props.goings)
        if (props.goings) {
            // console.log(props.goings,'goings')
            this.setState({ goings: props.goings })
            // console.log('array here*******', props.arr)
        }
        if (props.arr) {
            this.setState({ arr: props.arr })
        }
        if (props.notgoings) {
            this.setState({ notgoings: props.notgoings })
        }
        if (props.card) {
            // console.log('ye chala')
            setTimeout(() => {
                this.setState({ event: props.card })
                // console.log(props.card, 'events here')
            }, 100)
            // event.push(props.card)
        }
        if (props.reserved) {
            this.setState({ reserved: props.reserved })
        }
        if (props.event) {
            // console.log(props.event,'evvvvvvvv')
            // this.setState({ event: props.event })
        }
        if (props.totalReserved) {
            this.setState({ totalReserved: props.totalReserved })
        }
    }


    interested(id, key) {
        const { getInterested, userDetails } = this.props
        getInterested(id, key, userDetails.userUid)

        this.setState({ goings: this.props.goings })
    }

    notGoing(id, key) {
        const { getNotInterested, userDetails } = this.props

        getNotInterested(id, key, userDetails.userUid)
        this.setState({ notgoings: this.props.notgoings })
    }

    eventCard(image, title, description, ticket, price, index, key, seats) {
        // console.log(this.props.event)
        const { attendee } = this.props
        const { goings, notgoings, arr, totalReserved, totalSeats, reserved } = this.state
        return (
            <div className='event-card' style={reserved.indexOf(key) !== -1 ? { opacity: '0.9' } : { opacity: '1' }} key={`${index}`}>
                <div className='event-card-img'>
                    <img src={image} />
                    {
                        attendee &&
                        reserved.indexOf(key) !== -1 &&
                        <div className='event-card-sold'>
                            <img src={Sold} />
                        </div>
                    }
                </div>
                <div className='event-card-title'>
                    <span>{title}</span>
                </div>
                <div className={'event-card-description'}>
                    <p>{description}</p>
                </div>
                {
                    attendee &&
                    <div className='user-interest'>
                        {
                            goings.length > 0 &&
                            goings.map((items, value) => {
                                return (
                                    items === key &&
                                    <div key={value} id={'green'} onClick={(e) => { this.interested(e.currentTarget.id, key) }}>
                                        <FontAwesomeIcon icon='check-circle' style={{ color: 'green' }} />
                                    </div>
                                )
                            })
                        }
                        {
                            notgoings.length > 0 &&
                            notgoings.map((items, value) => {
                                return (
                                    items === key &&
                                    <div key={value} id={'red'} onClick={(e) => this.notGoing(e.currentTarget.id, key)}>
                                        <FontAwesomeIcon icon='times-circle' style={{ color: 'red' }} />
                                    </div>
                                )
                            })
                        }
                        {
                            arr.length > 0 &&
                            arr.indexOf(key) === -1 &&
                            <div>
                                <div id={'black'} onClick={(e) => { this.interested(e.currentTarget.id, key) }}>
                                    <FontAwesomeIcon icon='check-circle' style={{ color: 'black' }} />
                                </div>
                                <div id={'black'} onClick={(e) => this.notGoing(e.currentTarget.id, key)}>
                                    <FontAwesomeIcon icon='times-circle' style={{ color: 'black' }} />
                                </div>
                            </div>

                        }
                        {
                            arr.length === 0 &&
                            <div>
                                <div id={'black'} onClick={(e) => { this.interested(e.currentTarget.id, key) }}>
                                    <FontAwesomeIcon icon='check-circle' style={{ color: 'black' }} />
                                </div>
                                <div id={'black'} onClick={(e) => this.notGoing(e.currentTarget.id, key)}>
                                    <FontAwesomeIcon icon='times-circle' style={{ color: 'black' }} />
                                </div>
                            </div>

                        }

                    </div>
                }
                <div className='event-card-footer'>
                    {
                        attendee && <button disabled={reserved.indexOf(key) !== -1 && 'disabled'} className={reserved.indexOf(key) !== -1 ? 'btnToggle' : ''}>
                            {
                                reserved.indexOf(key) !== -1 ?
                                    'Sold' :
                                    <Link to={`${'/buy/'}${key}`} style={{ color: 'white', textDecoration: 'none' }}>Buy</Link>
                            }
                        </button>
                    }
                    {
                        !attendee && <button className='linked'>buy</button>
                    }
                    {
                        <Link to={`${'/details/'}${key}`} className={'link'}>Details</Link>
                    }
                    <span><b>Ticket</b>:{!price && ticket}</span>
                    {
                        price &&
                        <span><b>Rs:</b> {price && price}</span>
                    }
                </div>
            </div>
        )
    }

    render() {
        const { event } = this.state
        return (
            <div className='main-container'>
                {
                    event.map((items, index) => {
                        return this.eventCard(items.image, items.name, items.detail, items.ticket, items.price, index, items.key, items.seats)
                    })
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        userDetails: state.authReducer.USERDETAIL,
        event: state.authReducer.EVENTS,
        goings: state.rootReducer.GOING,
        arr: state.rootReducer.ARRAY,
        notgoings: state.rootReducer.NOTGOING,
        event: state.eventsReducer.EVENTS,
        card: state.eventsReducer.CARD,
        totalReserved: state.eventsReducer.TOTALRESERVED,
        reserved: state.eventsReducer.RESERVEDSEATS,

    })
}

function mapDispatchToProps(dispatch) {
    return ({
        getInterested: (id, key, user) => {
            dispatch(UserInterest(id, key, user))
        },
        getNotInterested: (id, key, user) => {
            dispatch(UserNotInterest(id, key, user))
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

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);



// export default EventCard;
