import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import './index.scss'

export default class ContextSelector extends React.Component {
  constructor(props){
    super(props)
    this.brands = this.props.brands.map( b => {
      return { value: b.id, label: b.name, stateProp: 'selectedBrand' }
    })

    this.retailers = this.props.retailers.map( r => {
      return { value: r.id, label: r.name, stateProp: 'selectedRetailer' }
    })

    this.state = {
      selectedBrand: null,
      selectedRetailer: null,
    }
  }

  handleChange( selected ){
    let { stateProp } = selected
    this.setState({ [stateProp]: selected })

    let combined = this.props.brands.concat(this.props.retailers)
    let original = combined.filter(a => a.id === selected.value)[0]

    this.props.selectContext( original )
  }

  render(){
    let { brands, retailers } = this
    let { selectedBrand, selectedRetailer } = this.state

    return (
      <div className="section">
        <div className="columns">
          <div className="column is-one-third is-offset-one-third animated fadeInDown context-selector">
            <h1 className="title">Choose context.</h1>
            <div className="form-control">
              <label htmlFor="select-brand">Vendor</label>
              <Select
                id="select-brand"
                className="select-context"
                value={selectedBrand}
                onChange={this.handleChange.bind(this)}
                options={brands}
                placeholder="Select vendor..."
              /> 
            </div>
            <div className="form-control">
              <label htmlFor="select-retailer">Retailer</label>
              <Select
                id="select-retailer"
                className="select-context"
                value={selectedRetailer}
                onChange={this.handleChange.bind(this)}
                options={retailers}
                placeholder="Select retailer..."
              /> 
            </div>
          </div>
        </div>
      </div> 
    )
  }
}

ContextSelector.propTypes = {
  brands: PropTypes.object,
  retailers: PropTypes.object,
  selectContext: PropTypes.func,
}
