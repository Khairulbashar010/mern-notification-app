import axios from 'axios'
import React, { Component } from 'react'
import { Link } from "react-router-dom"
import classess from './User.module.css'



export default class User extends Component {

        state = {
            users: [],
            name: "",
            isSubmitted: false,
            error: false
        }

    componentDidMount() {
        this.fetchUsers()
    }

    fetchUsers() {
         axios.get(`/users`)
        .then(res => {
            this.setState({users: res.data.user})
        })
        .catch(err =>
            console.log('Error ocured', err)
        )
    }

    changeHandler = (e) => {
        this.setState ({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        axios.post(`/`, {
            name: this.state.name
        })
        .then(res => {
            this.fetchUsers()
            if(res.data.res !== null){
                this.setState({
                    name: "",
                    isSubmitted: true,
                    error: false
                })
                setTimeout(() => {this.setState({ isSubmitted: false })}, 1000)
            }
            else{
                this.setState({
                    name: "",
                    error: true,
                    isSubmitted: false
                })
                setTimeout(() => {this.setState({ error: false })}, 1000)
            }
        })
        .catch(err => {
            this.setState({
                error: true,
                isSubmitted: false
            })
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                {this.state.isSubmitted && <p className="text-success">User created</p>}
                {this.state.error && <p className="text-danger">Error ocured</p>}

                <form onSubmit={this.submitHandler}>
                    <input
                    className="form-control my-2"
                    type="text"
                    name="name"
                    value= {this.state.name}
                    placeholder="Enter Name"
                    onChange={this.changeHandler}
                    />

                    <input
                    className="form-control btn btn-lg btn-primary mb-2"
                    type="submit"
                    value="Create"
                    />
                </form>
                <div>
                    <h2>Users</h2>
                    <ul>
                        {this.state.users.map( user =>
                        <li key={user._id}>
                            <Link to={{ pathname: `/${user.name}`, state: { id: user._id, name: user.name} }} className={classess.links}> {user.name}</Link>
                        </li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}