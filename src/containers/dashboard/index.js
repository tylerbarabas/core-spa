import React from 'react'
import PropTypes from 'prop-types'

export default class Dashboard extends React.Component {
  componentDidUpdate(){
    if (this.props.user.isError) this.props.logout()
  }

  render(){
    return (
      <div>
        Dashers
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

