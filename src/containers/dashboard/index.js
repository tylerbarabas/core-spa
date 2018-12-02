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

        if (user.id === null) {
            template = null; //TODO create a loading component to show for this
        } else if (user.isRevcascade) {
            let brands = [];
            let retailers = [];
            template = (<ContextSelector brands={brands} retailers={retailers} />);
        } else {
            let combined = user.retailers.concat(user.brands);
            let brands = user.brands || [];
            let retailers = user.retailers || [];
            if (combined.length > 1) {
                template = (<ContextSelector brands={brands} retailers={retailers} />);
            }
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
