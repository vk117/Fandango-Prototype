import React from "react";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/index.js';

class UserProfileStub extends React.Component {

 
	render() {
   
    

		return (

			<div className="profile-form">
                
                <div className="fr-widget">
                         
                          <div className="title">
                              <h3>User details</h3>
                          </div>

                          <div className="fr-widget-body">
                              <ul>
                                <li>Name is - {this.props.name}</li>
                                <li>Email is - {this.props.email}</li>
                              </ul>
                          </div>

                     </div>


            </div>

		);

	}

}

function mapStateToProps(state) { 

    return { email : state.email , name : state.name };
 } 

function mapDispatchToProps(dispatch) { 

    return bindActionCreators(actions,dispatch);
 } 

const UserProfile = connect(mapStateToProps,mapDispatchToProps)(UserProfileStub); 

export default UserProfile;

