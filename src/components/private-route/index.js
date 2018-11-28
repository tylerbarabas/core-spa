import React from 'react'
import { Route } from 'react-router-dom'
import Login from '../../containers/login'
import Service from '../../service'

export default function PrivateRoute ({ component: Component, isAuthenticated, ...rest}) {
    return ( <Route {...rest} render={() => {
        if (isAuthenticated === true) {
            return (<Component {...rest} />);
        } else if (Service.isValidCookie() === true){
            return (<Component {...rest} />);
        } else {
            return (<Login />)
        }
      }} /> )
}
