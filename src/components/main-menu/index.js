import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './index.scss'

class IO extends React.Component {
  render(){
    return (
      <div className="columns animated fadeIn">
        <div className="column io">
          <div className="columns">
            <div className="column">
              <h1>Item & Inventory Imports & Exports</h1>
              <h2>Please select a task below...</h2>
            </div>
          </div>
          <div className="columns">
            <Link to="/io/vendor-imports" className="column is-offset-one-fifth is-three-fifths large-button">Review Vendor Imports</Link>
          </div>
          <div className="columns">
            <div className="column is-offset-one-fifth is-three-fifths large-button">Import Retailer Attributes</div>
          </div>
          <div className="columns">
            <div className="column is-offset-one-fifth is-three-fifths large-button">Export Product Data</div>
          </div>
        </div>
      </div>
    ) 
  }
}

const mapStateToProps = () => ({ 
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IO)
