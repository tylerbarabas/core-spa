import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from '../../modules/auth'

class Dashboard extends React.Component {
    logout(){
        this.props.logout();
    }

    render(){
        return (
            <div>
                This is the dashboard.
                <div onClick={this.logout.bind(this)}>LOG OUT</div>
            </div>
        ) 
    }
}

const mapStateToProps = () => ({ 
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        logout
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
