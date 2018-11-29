import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from '../../modules/auth'
import { getMyUser } from '../../modules/user'

class Dashboard extends React.Component {
    componentDidMount(){
        this.props.getMyUser();
    }

    logout(){
        this.props.logout();
    }

    componentDidUpdate(){
        if (this.props.user.isError) this.logout();
    }

    isUser(){
        return (this.props.user.id === null) ? 'is-invisible' : '';
    }

    render(){
        return (
            <div className={this.isUser()}>
                This is the dashboard.
                <div onClick={this.logout.bind(this)}>LOG OUT</div>
            </div>
        ) 
    }
}

const mapStateToProps = ({ user }) => ({ 
    user
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        logout,
        getMyUser
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
