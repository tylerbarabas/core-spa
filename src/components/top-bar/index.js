import React from 'react'
import './index.scss'

export default class TopBar extends React.Component {
    render(){
        return (
            <div className="top-bar animated fadeInDown">
                <div className="logout" onClick={this.props.logout.bind(this)}>Log out</div>
            </div>
        )
    }
}
