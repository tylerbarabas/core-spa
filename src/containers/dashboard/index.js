import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from '../../modules/auth'
import { getMyUser } from '../../modules/user'
import { selectContext } from '../../modules/context'
import ContextSelector from '../../components/context-selector'
import DashboardMain from '../../components/dashboard-main'
import BigLoading from '../../components/big-loading'
import colors from '../app/variables.scss'

class Dashboard extends React.Component {
    componentDidMount(){
        this.props.getMyUser();
        document.body.style.backgroundColor = colors.backgroundGrey;
    }
    componentDidUpdate(){
        if (this.props.user.isError) this.props.logout();
    }

    isContext(){
        let { user, context } = this.props;
        let template = (<DashboardMain context={context} />);

        if (user.id === null) {
            template = <BigLoading msg={'Retrieving user data...'} />;
        } else if (context.id === null) {
            let combined = user.retailers.concat(user.brands);
            if (combined.length > 1) {
                template = (<ContextSelector brands={user.brands} retailers={user.retailers} selectContext={this.props.selectContext} />);
            } else if (combined.length === 1) {
                this.props.selectContext(combined[0])
            }
        }

        return template;
    }

    render(){
        return (
            <div>
                { this.isContext() }
            </div>
        ) 
    }
}

const mapStateToProps = ({ user, context }) => ({ 
    user,
    context,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        logout,
        getMyUser,
        selectContext,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
