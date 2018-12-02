import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from '../../modules/auth'
import { getMyUser, getMyBrands, getMyRetailers } from '../../modules/user'
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

        console.log('USER', user);

        if (user.id === null || user.isRevcascade) {
            template = null; //TODO create a loading component to show for this

            if (user.isRevcascade){
                console.log('is rc');
                if  (user.brands.length < 1 && user.retailers.length < 1) {
                    console.log('get here0');
                    if (!user.isRequesting) {
                        this.props.getMyBrands();
                        this.props.getMyRetailers();
                    }
                } else {
                    console.log('got here1');
                    template = (<ContextSelector brands={user.brands} retailers={user.retailers} />);
                }
            }
        } else {
            let combined = user.retailers.concat(user.brands);

            console.log('combined', combined);

            if (combined.length > 1) {
                template = (<ContextSelector brands={user.brands} retailers={user.retailers} />);
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
        getMyUser,
        getMyBrands,
        getMyRetailers,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
