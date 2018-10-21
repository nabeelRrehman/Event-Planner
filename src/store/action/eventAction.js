
import actionTypes from '../constant/constant'
import firebase from 'firebase'
import History from '../../History/History';
import swal from 'sweetalert2'



export function GettingEvents(user) {
    var event = []
    var reserved = []
    return dispatch => {

        firebase.database().ref('/events/' + user + '/').on('child_added', (snapShot) => {
            const data = snapShot.val()
            const card = {
                image: data.imageUrl,
                name: data.name,
                detail: data.detail,
                ticket: data.ticket,
                price: data.price,
                key: snapShot.key,
                seats: data.seatingArrange
            }
            event.push(card)
            dispatch({ type: actionTypes.CARD, payload: event })

        })
    }
}


export function EventsAttendee() {
    var event = []
    var reserved = []
    return dispatch => {
        // console.log('runhere 1')
        firebase.database().ref('/events/').on('child_added', (snapShot) => {
            firebase.database().ref('/events/' + snapShot.key + '/').on('child_added', (snaps) => {
                // console.log('runhere 2')

                // console.log(snaps.val())
                const data = snaps.val()
                const card = {
                    image: data.imageUrl,
                    name: data.name,
                    detail: data.detail,
                    ticket: data.ticket,
                    price: data.price,
                    key: snaps.key,
                    seats: data.seatingArrange
                }
                event = [...event, card]
                dispatch({ type: actionTypes.CARD, payload: event })

                const totalSeats = []
                const from = data.seatingArrange.from
                const to = data.seatingArrange.to
                for (var i = Number(from); i <= Number(to); i++) {
                    totalSeats.push(i)
                }

                firebase.database().ref('users').on('value', (snapShots) => {
                    const totalReserved = []
                    for (var key1 in snapShots.val()) {
                        // console.log(key1,'user data')
                        for (var key in snapShots.val()[key1]) {
                            const value = snapShots.val()[key1][key];
                            if (key === 'buyEvents') {
                                for (var key2 in value) {
                                    if (key2 === snaps.key) {
                                        firebase.database().ref('/users/' + key1 + '/buyEvents/' + key2).on('child_added', (snapsVal) => {
                                            // console.log('*******', snaps.val())
                                            totalReserved.push(...snapsVal.val())
                                            if (totalReserved.length == totalSeats.length) {
                                                if (reserved.indexOf(snaps.key) === -1) {
                                                    reserved.push(snaps.key)
                                                }
                                            }
                                            dispatch({ type: actionTypes.RESERVEDSEATS, payload: reserved })
                                        })
                                    }
                                }
                            }
                        }
                    }
                })

            })
        })
    }
}



export function DetailEvent(id) {
    var totalSeats = []
    var totalReserved = []
    return dispatch => {
        firebase.database().ref('/events/').on('value', (snapShot) => {
            for (var key in snapShot.val()) {
                const eventKey = snapShot.val()[key]
                for (var key2 in eventKey) {
                    if (key2 === id) {
                        console.log(eventKey[key2])
                        const event = {
                            image: eventKey[key2].imageUrl,
                            name: eventKey[key2].name,
                            detail: eventKey[key2].detail,
                            ticket: eventKey[key2].ticket,
                            price: eventKey[key2].price,
                            key: key2,
                            seats: eventKey[key2].seatingArrange,
                            address: eventKey[key2].address,
                            startTime: eventKey[key2].startTime,
                            endTime: eventKey[key2].endTime,
                            arrangement: eventKey[key2].arrangement,
                            location: eventKey[key2].location
                        }
                        const seats = eventKey[key2].seatingArrange
                        for (var i = Number(seats.from); i <= Number(seats.to); i++) {
                            totalSeats.push(i)
                        }
                        // this.setState({ event, totalSeats })
                        dispatch({ type: actionTypes.CARD, payload: event })
                        dispatch({ type: actionTypes.TOTALSEATS, payload: totalSeats })

                    }
                }
            }
        })


        firebase.database().ref('users').on('child_added', (snapShot) => {
            for (var key in snapShot.val()) {
                const value = snapShot.val()[key];
                if (key === 'buyEvents') {
                    for (var key2 in value) {
                        if (key2 === id) {
                            firebase.database().ref('/users/' + snapShot.key + '/buyEvents/' + key2 + '/').on('child_added', (snapshot) => {
                                console.log(snapshot.val())
                                totalReserved.push(...snapshot.val())
                                dispatch({ type: actionTypes.TOTALRESERVED, payload: totalReserved })
                            })
                        }
                    }
                }
            }
        })
    }
}


export function ReservedSeats(ticket) {
    var reservedSeats = []
    return dispatch => {
        firebase.database().ref('/events/').on('value', (snapShot) => {
            for (var key in snapShot.val()) {
                const eventKey = snapShot.val()[key]
                for (var key2 in eventKey) {
                    if (key2 === ticket) {
                        // console.log(eventKey[key2])
                        const event = {
                            image: eventKey[key2].imageUrl,
                            name: eventKey[key2].name,
                            detail: eventKey[key2].detail,
                            ticket: eventKey[key2].ticket,
                            price: eventKey[key2].price,
                            key: key2,
                            seats: eventKey[key2].seatingArrange,
                            address: eventKey[key2].address,
                            startTime: eventKey[key2].startTime,
                            endTime: eventKey[key2].endTime,
                            arrangement: eventKey[key2].arrangement,
                            location: eventKey[key2].location,
                            userUid: eventKey[key2].userUid
                        }
                        dispatch({ type: actionTypes.EVENTS, payload: event })

                        const list = []
                        if (event.seats) {
                            for (var i = Number(event.seats.from); i <= event.seats.to; i++) {
                                if (list.length !== (event.seats.to - event.seats.from) + 1) {
                                    list.push(i)
                                    dispatch({ type: actionTypes.LIST, payload: list })
                                }
                            }
                        }
                    }
                }
            }

            firebase.database().ref('/users/').on('child_added', (snapShot) => {

                for (var key in snapShot.val().buyEvents) {
                    if (key === ticket) {
                        firebase.database().ref('/users/' + snapShot.key + '/buyEvents/' + key + '/').on('child_added', (snapshot) => {
                            console.log(snapshot.val())
                            reservedSeats.push(...snapshot.val())
                            dispatch({ type: actionTypes.RESERVEDSEATS, payload: reservedSeats })
                        })
                    }
                }
            })

        })

    }
}