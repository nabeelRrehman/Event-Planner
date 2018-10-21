import React, { Component } from 'react';
import './role.css'
import Container from '../../Container/container';
import firebase from 'firebase'
import swal from 'sweetalert2'
import { connect } from 'react-redux'
import { AddRole } from '../../store/action/action'

class Role extends Component {
    constructor() {
        super()

        this.state = {
        }
        this.logout = this.logout.bind(this)
        this.addRole = this.addRole.bind(this)
    }

    logout() {                          //logout the user and clear the localStorage

    }

    componentDidMount() {
        const { userDetails } = this.props
        // console.log(userDetails)
        if (userDetails) {
            this.setState({ userUid: userDetails.userUid })
        } else {

        }
    }

    addRole() {
        const { role, userUid } = this.state
        const { addUserRole} = this.props
        console.log(userUid)
        swal({
            onOpen: () => {
                swal.showLoading()
            },
        })
        if (!role) {
            swal({
                text: 'Something went wrong',
                type: 'error'
            })
        } else {
            // const obj = {
            //     role,
            //     userUid : user
            // }
            // role && 
            // firebase.database().ref('/users/'+user+'/userDetails/').push(obj)
            // .then(()=>{
            //     swal({
            //         position: 'center',
            //         type: 'success',
            //         title: 'Done',
            //         showConfirmButton: false,
            //         timer: 1500
            //     })
            //     setTimeout(()=>{
            //         this.props.history.push('/home')
            //     },1500)
            // })
            addUserRole(userUid,role)
        }
    }

    render() {
        return (
            <Container logout={this.logout}>
                <div className='userRole'>
                    <h1>Choose Your Role</h1>
                    <div className='roles'>
                        <input type={'radio'} value={'organizer'} name={'role'} onChange={(e) => this.setState({ role: e.target.value })} /><span>Organizer</span>
                        <input type={'radio'} value={'attendee'} name={'role'} onChange={(e) => this.setState({ role: e.target.value })} /><span>Attendee</span>
                    </div>
                    <div className='roleButton'>
                        <button onClick={this.addRole}>Done</button>
                    </div>
                </div>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return ({
        user: state.authReducer.CURRENTUSER,
        profile_pic: state.authReducer.PROFILE_PIC,
        userDetails: state.authReducer.USERDETAIL,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        addUserRole: (text,role) => {
            dispatch(AddRole(text,role))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Role);

