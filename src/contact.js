import React, { Component } from 'react';
import './App.css';

class Contact extends Component {


    back() {
        this.props.history.push('/about')
    }
    render() {
        let users = {
            2345: {
                name: 'abc',
                number: 'xyz'
            },
            2346: {
                name: 'xyz',
                number: 'abc'
            },
            2347: {
                name: 'bhb',
                number: '03142552525'
            },
            2348: {
                name: 'qij',
                number: '03610245455'
            },
        }

        let requiredUser = users[this.props.match.params.id] 
        return (
            <div className="App">
                <h1>Contact Us</h1>
                UserName : {requiredUser.name}<br />
                Number : {requiredUser.number}<br />
                <button onClick={this.back.bind(this)}>back</button>
            </div>
        );
    }
}

export default Contact;
