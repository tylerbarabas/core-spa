import React from 'react'
import PropTypes from 'prop-types'

export default class FilterModal extends React.Component {
  render(){
    let {
      isActive,
      modalContent,
      primaryText,
      primaryAction,
      isSecondary,
      secondaryText,
      secondaryAction,
      closeAction,
    } = this.props

    return (
      <div className={`filter-modal modal ${(isActive)?'is-active':''}`}>
        <div className="modal-background" />
        <div className="modal-card animated flipInX">
          <header className="modal-card-head">
            <p className="modal-card-title">Explore the filters below to target specific results.</p>
            <button
              className="delete"
              aria-label="close"
              onClick={()=>{closeAction()}}
            />
          </header>
          <section className="modal-card-body">
            {modalContent}
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-primary"
              onClick={()=>{
                primaryAction()
                closeAction()
              }}
            >{primaryText}</button>
            <button
              className={`button is-secondary ${(isSecondary)?'':'is-hidden'}`}
              onClick={()=>{secondaryAction()}}
            >{secondaryText}</button>
          </footer>
        </div>
      </div>
    )
  }
}

FilterModal.propTypes = {
  isActive: PropTypes.bool,
  modalContent: PropTypes.element,
  primaryText: PropTypes.string,
  primaryAction:PropTypes.func,
  isSecondary: PropTypes.bool,
  secondaryText: PropTypes.string,
  secondaryAction: PropTypes.func,
  closeAction: PropTypes.func,
}
