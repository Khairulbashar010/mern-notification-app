import React from 'react'

export default function MessagePage() {

    const name = (window.location.search).split('=')[1].split('-')[1]
    return (
        <div className="App-header">
            <h3>This Page <br/> Is For <br/> {name}</h3>
            <a href="https://assesment.page.link/download" className="btn btn-primary my-3" ><i className="fas fa-download"></i>&nbsp;&nbsp;Download App</a>

        </div>
    )
}