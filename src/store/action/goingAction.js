
import actionTypes from '../constant/constant'
import firebase from 'firebase'
import History from '../../History/History';
import swal from 'sweetalert2'


export function UserInterest(id, key, user) {
    return dispatch => {
        if (id === 'black') {
            firebase.database().ref('/users/' + user + '/goingEvents/' + key).push(true)
            swal({
                position: 'center',
                type: 'success',
                title: 'Interested',
                showConfirmButton: false,
                timer: 1500
            })
        }
        else if (id === 'green') {
            firebase.database().ref('/users/' + user + '/goingEvents/' + key).remove()
        }
    }
}


export function UserNotInterest(id, key, user) {
    return dispatch => {
        if (id === 'black') {
            firebase.database().ref('/users/' + user + '/notGoingEvents/' + key).push(true)
            swal({
                position: 'center',
                type: 'success',
                title: 'Not Interested',
                showConfirmButton: false,
                timer: 1500
            })
        } else if (id === 'red') {
            firebase.database().ref('/users/' + user + '/notGoingEvents/' + key).remove()
        }
    }
}

var arr = []

export function GoingEvents(user) {
    var goings = []
    return dispatch => {
        // console.log('user',user)
        firebase.database().ref('/users/' + user + '/goingEvents/').on('child_added', (snapShot) => {
            goings.push(snapShot.key)
            // console.log(snapShot.key)
            // console.log(goings,"jhjkhjkhjkh")

            arr.push(snapShot.key)
            // this.setState({ goings, arr })
            dispatch({ type: actionTypes.GOING, payload: goings })
            dispatch({ type: actionTypes.ARRAY, payload: arr })
        })

        firebase.database().ref('/users/' + user + '/goingEvents/').on('child_removed', (snapShot) => {
            const removedKey = goings.indexOf(snapShot.key)
            const arrRemovedKey = arr.indexOf(snapShot.key)
            if (removedKey !== -1) {
                goings.splice(removedKey, 1)
                if (arrRemovedKey !== -1) {
                    arr.splice(arrRemovedKey, 1)
                    dispatch({ type: actionTypes.ARRAY, payload: arr })
                    
                }
                console.log(goings,'Action going Events')
                dispatch({ type: actionTypes.GOING, payload: goings })
            }
        })
    }
}

export function NotGoingEvents(user) {
    const notgoings = []
    return dispatch => {
        firebase.database().ref('/users/' + user + '/notGoingEvents/').on('child_added', (snapShot) => {
            notgoings.push(snapShot.key)
            arr.push(snapShot.key)
            dispatch({ type: actionTypes.NOTGOING, payload: notgoings })
            dispatch({ type: actionTypes.ARRAY, payload: arr })
        })

        firebase.database().ref('/users/' + user + '/notGoingEvents/').on('child_removed', (snapShot) => {
            const removedKey = notgoings.indexOf(snapShot.key)
            const arrRemovedKey = arr.indexOf(snapShot.key)
            if (removedKey !== -1) {
                notgoings.splice(removedKey, 1)
                if (arrRemovedKey !== -1) {
                    arr.splice(arrRemovedKey, 1)
                    dispatch({ type: actionTypes.ARRAY, payload: arr })
                }
                dispatch({ type: actionTypes.NOTGOING, payload: notgoings })
            }
        })
    }
}