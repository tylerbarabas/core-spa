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
      <div className={`modal ${(isActive)?'is-active':''}`>
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
  msg: PropTypes.string
}
