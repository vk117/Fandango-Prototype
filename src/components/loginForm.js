import React from "react";
import {ajax,formHandler} from '../helpers/helpers';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/index.js';

class LoginFormStub extends React.Component {

  loginUser = (event) => {

    event.preventDefault();

    let obj = this,temp = this.form, msg = this.msg;

  

    ajax({ data : formHandler(temp) },(r) => { 


        if("id" in r) {

           msg.className = ' alert alert-success alert-dismissible fade show ';
           msg.querySelector('.alert-inner--text').innerHTML = 'Login succesful, redirecting to dashboard...'; 

           obj.props.manageSession(true,r);

           obj.props.history.push('/dashboard'); 

        } else {

           msg.className = ' alert alert-warning alert-dismissible fade show ';
           msg.querySelector('.alert-inner--text').innerHTML = 'Invalid login details !';
        }

        msg.style.display = "block";

    },'/authenticate')


  }

	render() {

		return (

		<section className="py-xl bg-cover bg-size--cover" style={{ backgroundImage:"url('images/rawpixel-com-557125-unsplash.jpg')" }} >
        <span className="mask bg-primary alpha-6"></span>
        <div className="container d-flex align-items-center no-padding">
          <div className="col">
            <div className="row justify-content-center">
              <div className="col-lg-4">
                <div className="card bg-primary text-white">
                  <div className="card-body">
                    <button type="button" className="btn btn-primary btn-nobg btn-zoom--hover mb-5">
                      <span className="btn-inner--icon"><i className="fas fa-arrow-left"></i></span>
                    </button>
                    <span className="clearfix"></span>
                  
                    <h4 className="heading h3 text-white pt-3 pb-5">Welcome back,<br/>
                      login to your account.</h4>

                     <div ref={(el) => {this.msg = el;} } style={{display:"none"}} className="" role="alert">
                      <span className="alert-inner--icon"><i className="fas fa-check"></i></span>
                      <span className="alert-inner--text">Login Successful</span>
                 
                      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                    </div> 
                    <form ref={(f) => {this.form = f;} } onSubmit={this.loginUser} className="form-primary">
                      <div className="form-group">
                        <input required type="email" className="form-control" name="email" placeholder="Your email" defaultValue="abhin_sh3@yahoo.com" />
                      </div>
                      <div className="form-group">
                        <input type="password" required className="form-control" name="password" placeholder="Password" defaultValue="123" />
                      </div>
                      <div className="text-right mt-4"><a href="jsx-a11y/href-no-hash" className="text-white">Forgot password?</a></div>
                      <button type="submit" className="btn btn-block btn-lg bg-white mt-4">Login</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     </section>
		);

	}

}



function mapStateToProps(state) { 

    return { user : state.user , guest : state.guest , userLoggedIn : state.userLoggedIn };
 } 

function mapDispatchToProps(dispatch) { 

    return bindActionCreators(actions,dispatch);
 } 

const LoginForm = connect(mapStateToProps,mapDispatchToProps)(LoginFormStub); 

export default LoginForm;

