import React from 'react'
import PropTypes from 'prop-types'
import ContextSelector from '../../components/context-selector'
import BigLoading from '../../components/big-loading'

export default class Dashboard extends React.Component {
  componentDidUpdate(){
    if (this.props.user.isError) this.props.logout()
  }

  isContext(){
    let { user, context } = this.props
    let DashboardMain = this.props.dashboard
    let template = (<DashboardMain context={context} />)

    if (user.id === null) {
      template = <BigLoading msg={'Retrieving user data...'} />
    } else if (context.id === null) {
      let combined = user.retailers.concat(user.brands)
      if (combined.length > 1) {
        template = (<ContextSelector brands={user.brands} retailers={user.retailers} selectContext={this.props.selectContext} />)
      } else if (combined.length === 1) {
        this.props.selectContext(combined[0])
      }
    }

    return template
  }

  render(){
    return (
      <div>
        { this.isContext() }
      </div>
    ) 
  }
}

Dashboard.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
  context: PropTypes.object,
  dashboard: PropTypes.func,
  selectContext: PropTypes.func,
}

