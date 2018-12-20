import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import axios from 'axios';
import config from '../config';
import swal from 'sweetalert';

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      pwd:'',
      re_pwd:''
    }

    this.handleRegister = this.handleRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handelAlready = this.handelAlready.bind(this);
  }

  handelAlready(){
    axios.get(config.URL+"users/checkmail?email="+this.state.email)
    .then((result)=>{
      if(result.data.result === 'Success'){
        swal({
          title: "Access Failed",
          text: "Already registered email.",
          icon: "info",
          buttons : { confirm: true },
          closeOnConfirm: false,
          showLoaderOnConfirm: true
        });
      }
    }).catch((error)=>{
      if(error.response.status === 404) {
        this.handleRegister()
      }else{
        swal({
          title: "Access Error",
          text: "An unknown server error has occurred!",
          icon: "info",
          buttons : { confirm: true },
          closeOnConfirm: false,
          showLoaderOnConfirm: true
        });
      }
    })
  }

  handleRegister() {
    let id = this.state.email;
    let pw = this.state.pwd;
    let source = localStorage.getItem('source');

    if(this.state.pwd === this.state.re_pwd && this.state.pwd !== ''){
      this.props.onRegister(id, pw, source)
      .then((success) => {
        if(success === true){
          axios.get(config.URL+"users/requestMail?email="+this.state.email)
          .then(result => {
            if(result.data.result === 'Success'){
              swal("Success!", "Please check your email to activate your account.", "success");
              localStorage.removeItem('source');
            }
          }).catch(errer=>{
              swal({
                title: "Access Error",
                text: "An unknown server error has occurred!",
                icon: "info",
                buttons : { confirm: true },
                closeOnConfirm: false,
                showLoaderOnConfirm: true
                });
            })
        }else {
          this.setState({
            pwd: '',
            re_pwd:''
          });
        }
      });
    }else{
      swal({
        title: "Are you sure?",
        text: "Password is incorrect!",
        icon: "info",
        buttons : { confirm: true },
        closeOnConfirm: false,
        showLoaderOnConfirm: true
      });
      this.setState({
        pwd: '',
        re_pwd:''
      });
    }
 }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleKeyPress(e) {
    if(e.charCode ===13 ){
      this.handelAlready();
    }
  }

  render() {
    return (
      <div>
      <link rel="stylesheet" href="../css/style_account.css"/> 
      <div className="form-group">
        <label for="email" className="sr-only">Email address:</label>
        <input 
            type="email" 
            className="form-control" 
            name="email"
            placeholder="E-mail"
            value={this.state.email}
            onChange={this.handleChange}
        />
      </div>

      <div className="form-group">
        <label for="pwd" className="sr-only">Password:</label>
        <input 
          type="password" 
          className="form-control" 
          name="pwd" 
          placeholder="Password"
          value={this.state.pwd}
          onChange={this.handleChange}
        />        
      </div>

      <div className="form-group">
        <label for="re_pwd" className="sr-only">Confirm Password:</label>
          <input 
            type="password" 
            className="form-control" 
            name="re_pwd" 
            placeholder="Confirm Password"
            value={this.state.re_pwd}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
      </div>
                    
      <div className="text-center">
        <button className="btn btn-blue btn-block" onClick={this.handelAlready}><span>Sign up</span></button>                
      </div>  
    </div>
    );
  }
}

export default withRouter(SignUp);