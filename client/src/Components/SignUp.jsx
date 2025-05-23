import React, { Fragment } from 'react';
import { GoPerson } from "react-icons/go";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { useNavigate } from 'react-router';

const SignUp = () => {
     const navigate = useNavigate();
     const goTosignIn = () =>{navigate("/")}
    return (
        <Fragment>
            <div className=' d-flex '>
                
                <div style={{ background: "#f8f9fa" }} className="d-flex flex-column justify-content-center align-items-center w-100 p-5">
                    <h1 className="mb-4 text-center">
                        <span>Sign In to</span> <br />
                        <span> your Account</span></h1>
                    <div className="mb-3 w-50 position-relative">
                    
                    </div>
                    <div className="mb-3 w-50 position-relative">
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                        <CiMail />
                        </span>
                        <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Email"
                        />
                    </div>
                    </div>
                    <div className="mb-3 w-50 position-relative">
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                        <CiLock />
                        </span>
                        <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Password"
                        />
                    </div>
                    </div>
                </div>
                <div style={{background:"#643959", height:"100vh", width:"40%"}} className="text-center d-flex flex-column justify-content-center align-items-center p-4">
                    <h2 className="text-white mb-3">Hello Friend!</h2>
                    <p className="text-white">Enter your personal details and start a jouney with us</p><br />
                    {/* <p className="text-white mb-4">login with your personal info</p> */}
                    <button onClick={goTosignIn}  className="btn btn-outline-light rounded-pill px-4" style={{background:"#643959"}}>Sign Up</button>
                </div>
            </div>
            
        </Fragment>
    );
}

export default SignUp;
