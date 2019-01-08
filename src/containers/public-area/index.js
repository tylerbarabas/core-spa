import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class PublicArea extends React.Component {
  render(){
    return (
      <div>
                This is a public area.
      </div>
    ) 
  }
}

const mapStateToProps = () => ({ 
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicArea)
