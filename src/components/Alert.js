import React from 'react'

export default function Alert(props) {
    return (
        <div>
            <div className="alert alert-primary" role="alert" style={{height: "50px"}}>
                {props.message}
            </div>
        </div>
    )
}
