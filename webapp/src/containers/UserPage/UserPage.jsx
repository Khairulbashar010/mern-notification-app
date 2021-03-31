import React, { useEffect, useState } from 'react'

export default function UserPage(props) {
    useEffect(() => {
        fetchName()
    }, [])

    const [user, setName] = useState({})
    const [copied, setCopied] = useState(false)
    const {id} = props.location.state

    const fetchName = async () =>{
        const fetchName = await fetch(`/${id}`)
        const user = await fetchName.json()
        setName(user.data)
    }
    const dynamicLink = `https://assesment-web-part.herokuapp.com/message?user=${id}-${user.name}`
    const copyLink = () => {
            navigator.clipboard.writeText(`https://assesment.page.link/?link=${dynamicLink}&apn=com.mobileapp&amv=0&afl=${dynamicLink}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 1000)
    }

    return (
        <div className="App-header">
            <h3>This Page <br/> Is For <br/> {user.name}</h3>
            <button className="btn btn-primary my-3"
            onClick={copyLink} ><i className="fas fa-share"></i>&nbsp;&nbsp;Share</button>
            {copied && <p className="text-success">Link Copied</p>}

        </div>
    )
}