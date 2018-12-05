import React from 'react'

export default class DashCenter extends React.Component {
    render(){
        return (
            <div className="section">
              <div className="columns">
                <div className="column is-one-third is-offset-one-third animated fadeInDown context-selector">
                  <h1 className="title">Dashboard</h1>
                  <div style={{textAlign: 'center'}}>{this.props.context.name}</div>
                </div>
              </div>
            </div>
        )
    }
}
