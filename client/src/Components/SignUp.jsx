import React, { Fragment } from 'react';
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import * as yup from "yup";
import toast from 'react-hot-toast';
import { api } from '../axios';
import { useDispatch, useSelector } from "react-redux";
import { createUser } from '../Slice/User.slice';


const SignUp = () => {
     const navigate = useNavigate();
     const goTosignIn = () =>{navigate("/")}
     const goToHome = () =>{navigate("/homepage")}
     const {userData} = useSelector(states => states.User);
     const dispatch = useDispatch();
     

     const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            email: yup.string().min(2).trim().email("Must be an email").required("Email is required"),
            password: yup.string().trim().min(6, "Minimun 6 characters required").required("Password is required") 
        }),
        onSubmit: async(values, {resetForm}) =>{
            try {
                // console.log(values);
                const {data} = await api.post("/signin", values);
                console.log("values", data);
                toast.success(data.message);
                
                goToHome()
                resetForm();
                dispatch(createUser(data))
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message || "Something went wrong")
            }
        }
     })
    return (
        <Fragment>
            <div className=' d-flex '>
                
                <div style={{ background: "#f8f9fa" }} className="d-flex flex-column justify-content-center align-items-center w-100 p-5">
                    <h1 className="mb-4 text-center">
                        <span>Sign In to</span> <br />
                        <span> your Account</span></h1>
                    {/* <div className="mb-3 w-50 position-relative">
                    
                    </div> */}
                    <form onSubmit={formik.handleSubmit} noValidate>
                                            
                        <div className="mb-3 w-100 position-relative">
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                <CiMail />
                                </span>
                                <input
                                type="email"
                                placeholder="Email"
                                onChange={formik.handleChange}
                                 value={formik.values.email}
                                className={`form-control border-start-0 ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`} 
                                name='email'
                                />
                                {formik.touched.email && formik.errors.email && (
                                <div className="invalid-feedback">{formik.errors.email}</div>
                                )}
                        </div>
                     </div>
                    <div className="mb-3 w-100 position-relative">
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0">
                            <CiLock />
                            </span>
                            <input
                            type="text"
                            placeholder="Password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            className={`form-control border-start-0 ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`} 
                            name='password'
                            />
                            {formik.touched.password && formik.errors.password && (
                            <div className="invalid-feedback">{formik.errors.password}</div>
                            )}
                        </div>
                        <p className='text-center mt-3'>
                            <a href="#" style={{color:"black"}}>Forgot Password?</a>
                        </p>
                        <button type='submit' style={{background:"#F1AE32"}} className='btn rounded-pill w-100 mb-3 mt-2'>Sign In</button>
                        
                    </div>
                </form>
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
