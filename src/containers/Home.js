import React, { Component } from 'react';
import { SignIn } from '../components';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/authentication';
import swal from 'sweetalert';
import axios from 'axios';
import config from '../config';

class Home extends Component {
  constructor(props){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(id, pw) {
    return this.props.loginRequest(id, pw).then(() => {
      if(this.props.status === "SUCCESS") {
        localStorage.setItem('currentuser',JSON.stringify(this.props.currentUser))
        localStorage.setItem('userid',JSON.stringify(this.props.Id))
        localStorage.setItem('apikey',JSON.stringify(this.props.apiKey))
        this.props.history.push('/omex');
        return true;
      } else {
        if(this.props.Code === 401){
          swal({
            title: "Are you sure?",
            text: "Please check your email and password again.",
            icon: "info",
            buttons : { confirm: true },
            closeOnConfirm: false,
            showLoaderOnConfirm: true
          });
        }else if(this.props.Code === 402){
          swal({
            title: "Authentication failed",
            text: "Need to verify email first, Would you like to resend verification mail?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              axios.get(config.URL+"users/requestMail?email="+id)
              .then(result => {
                console.log(result)
                if(result.data.result === 'Success'){
                  swal("Success!", "Please check your email to activate your account.", "success")
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
            } else {
              swal("Please check your e-mail!");
              }
            });
          }else {
            swal({
              title: "Access Error",
              text: "An unknown server error has occurred!",
              icon: "info",
              buttons : { confirm: true },
              closeOnConfirm: false,
              showLoaderOnConfirm: true
            });
          }
        }
      }
    );
  }
    
  render() {
    return (
      <div>
        <div id="preloader"></div>
        <link rel="stylesheet" href="css/bootstrap.min.css" />
        <link rel="stylesheet" href="css/main.css"/>   
        <link rel="stylesheet" href="css/responsive.css"/>

        <div id="targetHome" class="gb-home-slider">	
          <div id="home-carousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner" role="listbox">
              <div class="item" style={{ "background-image": "url(images/img3.jpg)"}}>
                <div class="container">
                  <div class="item-content">
                    <div class="gb-middle">               
                    </div>
                  </div>
                </div>							
              </div>
              <div class="item active" style={{ "background-image": "url(images/img6.jpg)"}}>
                <div class="container">
                  <div class="item-content">
                    <div class="gb-middle">            
                    </div>
                  </div>
                </div>							
              </div>
              <div class="item" style={{ "background-image": "url(images/img5.jpg)"}}>
                <div class="container">
                  <div class="item-content">
                    <div class="gb-middle">            
                    </div>
                  </div>
                </div>							
              </div>
                
              <div class="bgBlack"></div>				
		        </div>
				    <ol class="carousel-indicators">
					    <li data-target="#home-carousel" data-slide-to="0" ></li>
					    <li data-target="#home-carousel" data-slide-to="1" class="active"></li>
					    <li data-target="#home-carousel" data-slide-to="2"></li>	
				    </ol>
			    </div>	
			
          <div className="visual-text">
            <div className="container">                   
              <div className="descTxt">
                <h1>Basic-Auth: Create login module by React!</h1>
              </div>			                       
            </div>
			    </div>						
		    </div>

        <section className="gb-home-section">
		      <div className="gb-home-contents">
			      <div className="container">			    
              <div className="row">
                <div className="col-md-7 leftCon">
                </div>
                    
                <div className="col-md-4 col-md-offset-1  rightCon">
                  <div className="mainLogin">
                    <SignIn login="pull-right btn"
                        onLogin={this.handleLogin}
                    />
                    <div className="btnForgotPass">
                      <a href="/forgot">Forgot password?</a><br/><br/>
                    </div>
                    <div className="btnLogin active">                        
                      <a className="btn btn-block" href="/register"><span>Sign up Now</span></a> 
                    </div>
                  </div>      
                </div>
              </div>			    	    
			      </div>
		      </div>			
        </section>		

		    <div className="gb-footer text-center">
			    <div className="container">				
				    <span>© <strong>SeonjinSon</strong>  All Rights Reserved.</span>
			    </div>
		    </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authentication.login.status,
    currentUser: state.authentication.status.currentUser,
    apiKey: state.authentication.status.apiKey,
    Id:state.authentication.status.Id,
    Code:state.authentication.status.Code
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (id, pw) => {
      return dispatch(loginRequest(id,pw));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);