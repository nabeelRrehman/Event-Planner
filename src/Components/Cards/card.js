import React, { Component } from 'react';
import firebase from 'firebase'
import swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Sold from '../../Assets/images/sold.png'
import { EventsAttendee } from '../../store/action/eventAction'
import { connect } from 'react-redux'
import { UserInterest } from '../../store/action/goingAction'
import { UserNotInterest } from '../../store/action/goingAction'

library.add(faTimesCircle)
library.add(faCheckCircle)


class Card extends Component {
    constructor(props) {
        super(props)

        this.state = {
            event: [],
            counter: 0,
            goings: props.goings,
            notgoings: props.notgoings,
            arr: [],
            reserved: [],
            totalSeatsLength: [],
            array: []
        }
    }

    componentDidMount() {

        const props = this.props
        console.log('evevntsssss', props)
        // this.gettingEvents(props)
        this.setState({ event: this.props.Uevent , reserved : this.props.reserved})
    }

    componentWillReceiveProps(props) {

        this.gettingEvents(props)

    }

    gettingEvents(props) {
        if (props.Uevent) {
            console.log(props.Uevent)
            this.setState({ event: props.Uevent })
        }
        if (props.goings) {
            // console.log(props.goings,'props goings')
            this.setState({ goings: props.goings })
        }
        if (props.notgoings !== this.props.notgoings) {
            console.log(props.notgoings)
            this.setState({ notgoings: props.notgoings })
        }
        if (props.reserved) {
            console.log(props.reserved, 'reserved seats')
            this.setState({ reserved: props.reserved })
        }
    }

    interest(id, key) {

        const { getInterested, userDetails } = this.props
        getInterested(id, key, userDetails.userUid)
        this.setState({ goings: this.props.goings })

    }

    notGoings(id, key) {

        const { getNotInterested, userDetails } = this.props

        getNotInterested(id, key, userDetails.userUid)
        this.setState({ notgoings: this.props.notgoings })
    }

    eventCard(image, title, description, ticket, price, index, key) {
        const { attendee } = this.props
        const { arr, reserved, goings, notgoings } = this.state
        console.log(reserved, 'reserved seats')
        return (
            <div className='event-card' style={{ border: `1px solid ${this.props.color}` }} key={`${index}`}>
                <div className='event-card-img'>
                    <img src={image} />
                    {
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
                            goings &&
                            goings.map((items, value) => {
                                return (
                                    items === key &&
                                    <div key={value} id={'green'} onClick={(e) => { this.interest(e.currentTarget.id, key) }}>
                                        <FontAwesomeIcon icon='check-circle' style={{ color: 'green' }} />
                                    </div>
                                )
                            })
                        }
                        {
                            notgoings &&
                            notgoings.map((items, value) => {
                                return (
                                    items === key &&
                                    <div key={value} id={'red'} onClick={(e) => this.notGoings(e.currentTarget.id, key)}>
                                        <FontAwesomeIcon icon='times-circle' style={{ color: 'red' }} />
                                    </div>
                                )
                            })
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
                    <span><b>Ticket</b> : {!price && ticket}</span>
                    {
                        price &&
                        <span><b>Rs : </b> {price && price}</span>
                    }
                </div>
            </div>
        )
    }

    render() {
        const { event, goings, notgoings } = this.state
        return (
            <div className='main-container'>
                {
                    event.map((items, index) => {
                        return (
                            goings &&
                            goings.indexOf(items.key) !== -1 &&
                            this.eventCard(items.image, items.name, items.detail, items.ticket, items.price, index, items.key, items.seats)
                        )
                    })
                }
                {
                    event.map((items, index) => {
                        return (
                            notgoings &&
                            notgoings.indexOf(items.key) !== -1 &&
                            this.eventCard(items.image, items.name, items.detail, items.ticket, items.price, index, items.key, items.seats)
                        )
                    })
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        userDetails: state.authReducer.USERDETAIL,
        goings: state.rootReducer.GOING,
        card: state.eventsReducer.CARD,
        notgoings: state.rootReducer.NOTGOING,
        reserved: state.eventsReducer.RESERVEDSEATS,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        getEventAttendee: () => {
            dispatch(EventsAttendee())
        },
        getInterested: (id, key, user) => {
            dispatch(UserInterest(id, key, user))
        },
        getNotInterested: (id, key, user) => {
            dispatch(UserNotInterest(id, key, user))
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);


