import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ParentContainerComponent from '../../extendables/parent-container-component'
import PrivateRoute from '../private-route'
import { logout, setIsAuthenticated } from '../../modules/auth'
import { getMyUser } from '../../modules/user'
import { selectContext } from '../../modules/context'
import Breadcrumbs from '../../components/breadcrumbs'
import TopBar from '../../components/top-bar'
import Dashboard from '../dashboard'
import PublicArea from '../public-area'
import NotFound from '../not-found'
import 'bulma'
import 'animate.css'
import './base.scss'

class App extends ParentContainerComponent {
  componentDidMount(){
    this.setBackgroundColor()
    this.checkIsUser()
  }

  componentDidUpdate(){
    this.setBackgroundColor()
    this.checkIsUser()
  }

  render(){
    let { isAuthenticated } = this.props.auth
    let { user, setIsAuthenticated, logout, context, selectContext } = this.props
    return(
      <div>
        <main>
          <TopBar name={'Platform'} logout={logout} user={user} context={context} isAuthenticated={isAuthenticated} selectContext={selectContext} />
          <Breadcrumbs isAuthenticated={isAuthenticated} />
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} user={user} context={context} selectContext={selectContext} />
            <Route exact path="/public-area" component={PublicArea} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    )
  }
}

App.propTypes = {
  auth: PropTypes.object,
  user: PropTypes.object,
  context: PropTypes.object,
  getMyUser: PropTypes.func,
  setIsAuthenticated: PropTypes.func,
  logout: PropTypes.func,
  selectContext: PropTypes.func,
}

const mapStateToProps = ({ auth, user, context }) => ({ 
  auth,
  user,
  context,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMyUser,
      setIsAuthenticated,
      logout,
      selectContext,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
