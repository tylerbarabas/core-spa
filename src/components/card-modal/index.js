import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export default class CardModal extends React.Component {
  render(){
    let {
      isActive,
      modalTitle,
      modalContent,
      primaryText,
      primaryAction,
      isSecondary,
      secondaryText,
      secondaryAction,
      closeAction,
    } = this.props

    return (
      <div className={`card-modal modal ${(isActive)?'is-active':''}`>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{modalTitle}</p>
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
              className="button is-success"
              onClick={()=>{primaryAction()}}
            >{primaryText}</button>
            <button
              className="button"
              onClick={()=>{secondaryAction()}}
            >{secondaryText}</button>
          </footer>
        </div>
      </div>
    )
  }
}

CardModal.propTypes = {
  isActive: PropTypes.bool,
  modalTitle: PropTypes.string,
  modalContent: PropTypes.string,
  primaryText: PropTypes.string,
  primaryAction:PropTypes.func,
  isSecondary: PropTypes.bool,
  secondaryText: PropTypes.string,
  secondaryAction: PropTypes.func,
  closeAction: PropTypes.func,
}
