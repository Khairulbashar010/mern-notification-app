import React, { useEffect, useState } from 'react'

export default function MessagePage(props) {
    console.log(props)

    return (
        <div className="App-header">
            <h3>This Page <br/> Is For <br/></h3>
            <a href="https://assesment.page.link/download" className="btn btn-primary my-3" ><i className="fas fa-download"></i>&nbsp;&nbsp;Download App</a>

        </div>
    )
}