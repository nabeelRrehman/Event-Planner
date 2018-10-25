
import actionTypes from '../constant/constant'
import firebase from 'firebase'
import History from '../../History/History';
import swal from 'sweetalert2'

export function SignUpAuth(user) {
    swal({
        onOpen: () => {
            swal.showLoading()
        }
    })
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((success) => {
                delete user.password
                console.log('success signup')
                swal({
                    position: 'center',
                    type: 'success',
                    title: 'Successfully Registered',
                    showConfirmButton: false,
                    timer: 1500
                })
                firebase.database().ref('/users/' + success.user.uid + '/userDetails').set(user)
                History.push('/')
                dispatch({ type: actionTypes.CURRENTUSER, payload: user })
            })
            .catch((error) => {
                swal({
                    type: 'error',
                    title: 'Error',
                    text: error.message
                })
            })
    }
}


export function SignInAuth(user) {
    swal({
        onOpen: () => {
            swal.showLoading()
        }
    })
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((success) => {
                delete user.password
                console.log('user signin success')
                swal({
                    position: 'center',
                    type: 'success',
                    title: 'Successfully Login',
                    showConfirmButton: false,
                    timer: 1500
                })
                firebase.database().ref('users/' + success.user.uid + '/userDetails').on('value', (snapShot) => {
                    console.log(snapShot.val())
                    const currentUser = snapShot.val()
                    dispatch({ type: actionTypes.CURRENTUSER, payload: currentUser })
                    History.push('/home')
                })
            })
            .catch(() => {
                var credential = firebase.auth.EmailAuthProvider.credential(user.email, user.password);
                firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential).then(function (success) {
                    var user = success.user;
                    console.log("Account linking success", user);
                    delete user.password
                    console.log('user signin success')
                    swal({
                        position: 'center',
                        type: 'success',
                        title: 'Successfully Linked',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    firebase.database().ref('users/' + success.user.uid + '/userDetails').on('value', (snapShot) => {
                        console.log(snapShot.val())
                        const currentUser = snapShot.val()
                        dispatch({ type: actionTypes.CURRENTUSER, payload: currentUser })
                        History.push('/home')
                    })
                }, function (error) {
                    var prevUser = firebase.auth().currentUser;
                    // Sign in user with another account
                    firebase.auth().signInWithCredential(credential).then(function (user) {
                        console.log("Sign In Success", user);
                        var currentUser = user;

                        // Merge prevUser and currentUser data stored in Firebase.
                        // Note: How you handle this is specific to your application

                        // After data is migrated delete the duplicate user
                        return user.delete().then(function () {
                            // Link the OAuth Credential to original account
                            return prevUser.linkWithCredential(credential);
                        }).then(function () {
                            // Sign in with the newly linked credential
                            return firebase.auth().signInWithCredential(credential)

                        });
                    }).catch(function (error) {
                        console.log("Sign In Error", error);
                        swal({
                            type: 'error',
                            title: 'Error',
                            text: error.message
                        })
                    });
                })
            })
    }
}



export function fbAuth(provider) {

    return dispatch => {

        firebase.auth().signInWithPopup(provider)
            .then(success => {
                const obj = {
                    email: success.email,
                    name: success.displayName,
                    profile_pic: success.photoURL,
                    userUid: success.uid,
                    role: false
                }
                firebase.database().ref('users/' + success.user.uid + '/userDetails').update(obj)
                    .then(() => {
                        swal({
                            position: 'center',
                            type: 'success',
                            title: 'Successfully Login',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        History.push('/home')
                    })
                dispatch({ type: actionTypes.CURRENTUSER, payload: obj })
            })
            .catch(error => {
                // console.log(error)
                console.log(firebase.auth().currentUser, 'current User')
                firebase.auth().currentUser.linkWithPopup(provider).then(function (result) {
                    // Accounts successfully linked.
                    var credential = result.credential;
                    var user = result.user;
                    console.log(credential)
                    console.log(user)

                    var prevUser = firebase.auth().currentUser;
                    // Sign in user with another account
                    firebase.auth().signInWithCredential(credential).then(function (user) {
                        console.log("Sign In Success", user);
                        var currentUser = user;
                        // Merge prevUser and currentUser data stored in Firebase.
                        // Note: How you handle this is specific to your application 

                        return firebase.auth().signInWithCredential(credential)
                            .then((success) => {
                                console.log(success)
                                const obj = {
                                    email: success.email,
                                    name: success.displayName,
                                    profile_pic: success.photoURL,
                                    userUid: success.uid,
                                    role: false
                                }
                                firebase.database().ref('users/' + success.user.uid + '/userDetails').update(obj)
                                    .then(() => {
                                        History.push('/home')
                                    })
                                dispatch({ type: actionTypes.CURRENTUSER, payload: obj })
                            })
                    }).catch(function (error) {
                        console.log("Sign In Error", error);
                        swal({
                            type: 'error',
                            title: 'Error',
                            text: error.message
                        })
                    });
                    // ...
                }).catch(function (error) {
                    swal({
                        type: 'error',
                        title: 'Error',
                        text: error.message
                    })
                });
            })
    }
}

export function googleAuth(provider) {
    return dispatch => {
        firebase.auth().signInWithPopup(provider)
            .then(success => {
                var uid = success.user.uid;
                var profile_pic = success.user.photoURL
                const obj = {
                    email: success.user.email,
                    name: success.user.displayName,
                    profile_pic: profile_pic,
                    userUid: uid,
                    role: false
                }
                firebase.database().ref('users/' + success.user.uid + '/userDetails').update(obj)
                    .then(() => {
                        History.push('/home')
                    })
                dispatch({ type: actionTypes.CURRENTUSER, payload: obj })
            })
            .catch(error => alert(error.message))
    }
}


export function OnAuth() {
    return dispatch => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                var uid = user.uid;
                var profile_pic = user.photoURL
                const obj = {
                    userUid: uid,
                    profile_pic: profile_pic
                }
                dispatch({ type: actionTypes.USERUID, payload: obj })
                // History.push('/home')    //isko uncomment krna ha
                // ...
            } else {
                // User is signed out.
                // ...
                History.push('/')

            }
        });
    }
}


export function CheckRole(userUid) {
    return dispatch => {
        // console.log(userUid)
        firebase.database().ref('users/' + userUid + '/userDetails').on('value', (snapShot) => {
            // console.log(snapShot.val())
            var obj = snapShot.val()
            dispatch({ type: actionTypes.USERDETAIL, payload: obj })
        })
    }
}

export function AddRole(userUid, role) {
    return dispatch => {
        const obj = {
            role: role
        }
        firebase.database().ref('/users/' + userUid + '/userDetails').update(obj)
            .then((success) => {
                swal({
                    position: 'center',
                    type: 'success',
                    title: 'Done',
                    showConfirmButton: false,
                    timer: 1500
                })
                History.push('/home')
                console.log('Role Updated', success)
            })
    }
}

export function AddUEvent(obj, userUid) {
    return dispatch => {
        firebase.database().ref('/events/' + userUid + '/').push(obj)
            .then(() => {
                swal({
                    position: 'center',
                    type: 'success',
                    title: 'Successfully Add Event',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch((error) => {
                swal({
                    type: 'error',
                    title: error.message
                })
            })
    }
}


export function GetEvent() {
    let events = []
    return dispatch => {
        firebase.database().ref('/events/').on('child_added', (snapShot) => {
            events = [...events, snapShot.key]
            // console.log(snapShot.key)
            // console.log(events)
            // console
            dispatch({ type: actionTypes.EVENTS, payload: events })
        })
    }
}