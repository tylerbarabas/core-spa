import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../home'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { requestToken } from '../../modules/token'
import 'bulma'
import './base.scss'

class App extends React.Component{
    componentDidMount(){
        this.props.requestToken();
    }

    render(){
        return (
            <div>
                <main>
                    <Route exact path="/" component={Home} />
                </main>
            </div>
        );
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        requestToken
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
