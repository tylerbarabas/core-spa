import React from 'react'
import PropTypes from 'prop-types'
import colors from './variables.scss'

export default class ParentContainerComponent extends React.Component {
  /**
    Toggle between the two possible background colors

    @param props - this.props of a React.Component.
    auth module must be imported.
  **/
  setBackgroundColor(props = this.props){
    let { isAuthenticated } = props.auth
    document.getElementById('root').style.backgroundColor = (!isAuthenticated) ? colors.backgroundDarkBlue : colors.backgroundGrey
    document.getElementsByTagName('html')[0].style.backgroundColor = (!isAuthenticated) ? colors.backgroundDarkBlue : colors.backgroundGrey
    document.body.style.backgroundColor = (!isAuthenticated) ? colors.backgroundDarkBlue : colors.backgroundGrey
  }

  /**
    Check for user, handle the result.  Used in all apps upon session start.

    @param props - this.props of a React.Component.
    auth & user modules must be imported.
  **/
  checkIsUser(props = this.props){
    let { id, isError, isRequesting } = props.user
    let { isAuthenticated } = props.auth
    if ( id === null && isAuthenticated && !isRequesting && !isError ){
      props.getMyUser()
    } else if ( isError ) {
      props.logout()
    }
  } 
}

ParentContainerComponent.propTypes = {
  user: PropTypes.object,
  auth: PropTypes.object,
}
