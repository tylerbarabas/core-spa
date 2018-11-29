import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from '../../modules/auth'
import { getMyUser } from '../../modules/user'
import ContextSelector from '../../components/context-selector'
import DashboardMain from '../../components/dashboard-main'
import TopBar from '../../components/top-bar'

class Dashboard extends React.Component {
    componentDidMount(){
        this.props.getMyUser();
    }

    componentDidUpdate(){
        if (this.props.user.isError) this.props.logout();
    }

    isUser(){
        return (this.props.user.id === null) ? {display: 'none'} : {};
    }

    isContext(){
        let { user } = this.props;
        let template = (<DashboardMain />);

        console.log('user', user);
        if (user.id === null) {
            template = null;
        } else if (user.isRevcascade) {
            template = (<ContextSelector brands={'all'} retailers={'all'} />);
        } else {
            //fetch contexts, if more than one, feed them to the context selector, else leave template unmodified
            template = (<ContextSelector brands={['mybrand']} retailers={['myretailer']} />);
        }
        return template;
    }

    render(){
        return (
            <div style={this.isUser()}>
                <TopBar logout={this.props.logout} />
                { this.isContext() }
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
