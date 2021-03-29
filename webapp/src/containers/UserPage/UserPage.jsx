import React, { useEffect, useState } from 'react'

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
    const copyLink = () => {
        navigator.clipboard.writeText(`User id: ${id}`)
    }

    return (
        <div className="App-header">
            <h3>This Page <br/> Is For <br/> {user.name}</h3>
            <button className="btn btn-primary my-3"
            onClick={copyLink} ><i className="fas fa-share"></i>&nbsp;&nbsp;Share</button>
        </div>
    )
}