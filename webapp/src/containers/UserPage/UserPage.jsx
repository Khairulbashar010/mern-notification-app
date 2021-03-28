import React, { useEffect, useState } from 'react'
import classess from "../User/User.module.css"

export default function UserPage(props) {
    useEffect(() => {
        fetchName()
    }, [])

    const [user, setName] = useState({})
    const {id} = props.location.state

    const fetchName = async () =>{
        const fetchName = await fetch(`/${id}`)
        const user = await fetchName.json()
        setName(user.data)
    }

    return (
        <div className="App-header">
            <h3>This Page <br/> Is For <br/> {user.name}</h3>
            <button className={classess.button} type="submit"><i className="fas fa-share"></i>&nbsp;&nbsp;Share</button>
        </div>
    )
}