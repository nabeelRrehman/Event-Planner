import React, { Component } from 'react';
import './App.css';
import {
    Link
} from 'react-router-dom'


class About extends Component {

    myFunc() {
        console.log('working')

        this.props.history.push('/')
    }


    routeToContact() {
        this.props.history.push('/contact/12345')

    }

    render() {
        return (
            <div className="App">
                <h1>About Page</h1>

                <button onClick={this.myFunc.bind(this)}>click here</button>
                <button onClick={this.routeToContact.bind(this)}>Contact</button>


                <ul>
                    <li><Link to='/contact/2345'>number 1</Link></li>
                    <li><Link to='/contact/2346'>number 2</Link></li>
                    <li><Link to='/contact/2347'>number 3</Link></li>
                    <li><Link to='/contact/2348'>number 4</Link></li>
                </ul>

            </div>
        );
    }
}

export default About;
