import React, { Component } from 'react';
import { SignUp } from '../components';
import { connect } from 'react-redux';
import { registerRequest } from '../actions/authentication';
import swal from 'sweetalert';

class Register extends Component {
  constructor(props){
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }
  
  handleRegister(id, pw, source) {
    return this.props.registerRequest(id, pw, source).then(() => {
      if(this.props.status === "SUCCESS") {
        this.props.history.push('/login');
        return true;
      } else {
        if(this.props.Code === 500){
          swal({
            title: "Access Error",
            text: "An unknown server error has occurred!",
            icon: "info",
            buttons : { confirm: true },
            closeOnConfirm: false,
            showLoaderOnConfirm: true
          });
            
          return false;
        }
      }
    }).catch((error)=>{
      swal({
        title: "Access Error",
        text: "An unknown server error has occurred!",
        icon: "info",
        buttons : { confirm: true },
        closeOnConfirm: false,
        showLoaderOnConfirm: true
        });
      })
  }

  render() {
    return (
      <div>
        <link rel="stylesheet" href="../css/style_account.css"/> 
        
        <section className="accountPage">
          <div className="container">
            <div className="panel panel-default outlineBox">
              <div className="panel-heading">Sign up</div>
                <div className="panel-body">
                  <SignUp onRegister={this.handleRegister}/>
                </div>
              </div>
            </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authentication.register.status,
    Code:state.authentication.status.Code
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerRequest: (id, pw, source) => {
      return dispatch(registerRequest(id,pw,source));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);