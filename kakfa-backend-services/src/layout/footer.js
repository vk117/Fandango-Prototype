import React from "react";
// import {*} from '../helpers/helpers';

class Footer extends React.Component {


	render() {

		return (

              <footer>
        
        <div id="top-footer-area">
            
            <h5>&laquo; Over 100,000 satisfied users &raquo;</h5>
            <p> Morbi sed neque dignissim, tincidunt tortor quis, porta velit. In ornare ultrices arcu id elementum</p>

        </div>

        <div className="footer-cols">
            
            <div className="container">
                <div className="row">
                    
                    <div className="col-lg-3 col-sm-6 col-12">
                
                        <h4>Categories</h4>
                        
                        <ul className='footer-nav'>
                            <li><a href="">Web development</a></li>
                            <li><a href="">Mobile development</a></li>
                            <li><a href="">SEO</a></li>
                            <li><a href="">REST API</a></li>
                            <li><a href="">Gumballs</a></li>
                        </ul>

                    </div>

                    <div className="col-lg-3 col-sm-6 col-12">
                        
                       <h4>Categories</h4>
                        
                        <ul className='footer-nav'>
                            <li><a href="">Graphic designing</a></li>
                            <li><a href="">Branding</a></li>
                            <li><a href="">SEO</a></li>
                            <li><a href="">REST API</a></li>
                            <li><a href="">More Gumballs</a></li>
                        </ul>

                    </div>

                    <div className="col-lg-3 col-sm-6 col-12">
                        
                        <h4>Categories</h4>
                        
                        <ul className='footer-nav'>
                            <li><a href="">Spaceships</a></li>
                            <li><a href="">Excel</a></li>
                            <li><a href="">3d modeling</a></li>
                        </ul>

                    </div>

                    <div className="col-lg-3 col-sm-6 col-12">
                        
                        <h4>Follow us</h4>
                        
                       <div className="social-widget">
                           
                           <ul className='clearfix'>
                               <li>
                                   <a target="_BLANK" href=""><i className="fab fa-facebook-f"></i></a>
                               </li>

                               <li>
                                   <a target="_BLANK" href=""><i className="fab fa-twitter"></i></a>
                               </li>

                               <li>
                                   <a target="_BLANK" href=""><i className="fab fa-linkedin"></i></a>
                               </li>

                           </ul>


                       </div>

                    </div> 


                </div>
            </div>

        </div> 
        
        <nav id="footer-menu">
            
            <div className="container">
                <div className="row">
                    
                    <div className="col-12">
                        <div className="footer-menu-wrap clearfix">
                                
                            <ul className='clearfix'>
                                <li><a href="">Disclaimer</a></li>
                                <li><a href="">Privacy</a></li>
                                <li><a href="">Terms and Conditions</a></li>
                                <li><a href="">Support</a></li>
                                <li><a href="">Contact</a></li>
                            </ul>
                        
                        </div>

                    </div>

                </div>
            </div>

        </nav>


    </footer>
    
                
              );

	}

}

export default Footer;

