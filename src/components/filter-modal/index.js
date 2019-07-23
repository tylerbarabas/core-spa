import React from 'react'
import PropTypes from 'prop-types'
import './index.scss' 

export default class FilterModal extends React.Component {
  render(){
    let {
      isActive,
      modalContent,
      primaryText,
      primaryAction,
      secondaryText,
      secondaryAction,
      closeAction,
    } = this.props

    return (
      <div className={`filter-modal modal ${(isActive)?'is-active':''}`}>
        <div className="modal-background" />
        <div className="modal-card animated flipInX">
          <header className="modal-card-head">
            <p className="text-muted">Explore the filters below to target specific results.</p>
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
              className={`button is-secondary`}
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
  secondaryText: PropTypes.string,
  secondaryAction: PropTypes.func,
  closeAction: PropTypes.func,
}
