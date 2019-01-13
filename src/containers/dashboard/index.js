import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from '../../modules/auth'
import { selectContext } from '../../modules/context'
import DashboardMain from '../../components/dashboard-main'

class Dashboard extends React.Component {
  componentDidUpdate(){
    if (this.props.user.isError) this.props.logout()
  }

  render(){
    let { context } = this.props
    return (
      <div>
        <DashboardMain context={context} />
      </div>
    ) 
  }
}

Dashboard.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
  context: PropTypes.object,
  dashboard: PropTypes.element,
  selectContext: PropTypes.func,
}

const mapStateToProps = ({ user, context }) => ({ 
  user,
  context,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout,
      selectContext,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
