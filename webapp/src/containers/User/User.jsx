import axios from 'axios'
import React, { Component } from 'react'
import { isIOS } from 'react-device-detect'
import { Link } from "react-router-dom"
import classess from './User.module.css'



export default class User extends Component {
    constructor(props){
        super()
        this.state = {
            users: [],
            name: "",
            isSubmitted: false,
            error: false,
            userName: ""
        }
        this.fetchUsers = this.fetchUsers.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)

    }

    componentDidMount() {
        this.fetchUsers()
        const url = (window.location.search).toString()
        const userName = url.split('-')[1]
        if(userName)
        this.setState({userName});
    }

    fetchUsers() {
         axios.get(`/users`)
        .then(res => {
            this.setState({users: res.data.user});

        })
        .catch(err =>
            console.log('Error ocured', err)
        )
    }

    changeHandler(event) {
        this.setState ({
            [event.target.name]: event.target.value
        })
    }

    submitHandler(event) {
        event.preventDefault()
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
        })
    }

    render() {
        const {users} = this.state
        return (
            <div>
                { this.state.userName.length > 2 ?
                <div className="">
                    <h3>This Page <br/> Is For <br/> {this.state.userName}</h3>
                    {isIOS ?
                    <a href="https://assesment.page.link/downloadIOS" className="btn btn-primary my-3" ><i className="fas fa-download"></i>&nbsp;&nbsp;Download App</a>
                    :
                    <a href="https://assesment.page.link/download" className="btn btn-primary my-3" ><i className="fas fa-download"></i>&nbsp;&nbsp;Download App</a>}

                </div>
                 :
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
                            {users.map( user =>
                            <li key={user._id}>
                                <Link to={{ pathname: `/${user.name}`, state: { id: user._id, name: user.name} }} className={classess.links}> {user.name}</Link>
                            </li>
                            )}
                        </ul>
                    </div>
                </div>
                 }
            </div>
        )
    }
}