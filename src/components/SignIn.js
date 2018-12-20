import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";


class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password: '',
      isChecked:false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleLogin() {
    let id = this.state.username;
    let pw = this.state.password;

    this.props.onLogin(id, pw).then(
      (success) => {
        if(!success) {
          this.setState({
            password: ''
          });
        }

        if(this.state.isChecked === true) {
          localStorage.setItem('remember',id);
        }else{
          localStorage.removeItem('remember');
        }  
      }
    );   
  }

  toggleChange(){
    this.setState({
      isChecked: !this.state.isChecked
    })
  }

  handleKeyPress(e) {
    if(e.charCode ===13 ){
      this.handleLogin();
    }
  }

  render() {
    return (
      <div>
      <link rel="stylesheet" href="../css/style_account.css" /> 

        <div className="form-group">
          <label for="email" className="sr-only">Email address:</label>
          <input 
            type="email" 
            className="form-control" 
            name="username" 
            placeholder="E-mail"
            defaultValue={this.state.username}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label for="pwd" className="sr-only">Password:</label>
          <input 
              type="password" 
              className="form-control" 
              name="password" 
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
          />
        </div>

        <div className="clearfix">
          <div className="pull-left chkRemember">
            <input type="checkbox" id="remember" checked={this.state.isChecked} onChange={this.toggleChange}/><label for="remember">Remember me?</label>
          </div>
        </div>  
        <div className="btnLogin">
          <button onClick={this.handleLogin} className={this.props.login}><span>LOGIN</span></button><br/>
        </div>        
      </div>
    );
  }
}

SignIn.propTypes = {
    onLogin: PropTypes.func
}

SignIn.defaultProps = {
    onLogin: (id, pw) => { console.error("onLogin not defined"); }
}

export default withRouter(SignIn);