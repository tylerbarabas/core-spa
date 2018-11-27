import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class DashboardAgain extends React.Component {
    render(){
        return (
            <div>
                This is the dashboard AGAIN.
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
)(DashboardAgain)
