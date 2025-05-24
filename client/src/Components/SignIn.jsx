import React, { Fragment } from 'react';
import { GoPerson } from "react-icons/go";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { useNavigate } from 'react-router';
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { api } from '../axios';


const SignIn = () => {
    const navigate = useNavigate();
    const goToSignUp = () =>{navigate("/signup")}
    
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            name: yup.string().min(2).trim().required("Name is a required field"),
            email: yup.string().min(2).trim().email("Must be an email").required("Email is required"),
            password: yup.string().trim().min(6, "Minimun 6 characters required").required("Password is required")
        }),
        onSubmit: async(values, {resetForm}) =>{
            try {
                // console.log(values);
                const {data} = await api.post("/signup", values);
                toast.success(data.message);
                goToSignUp();
                resetForm();
                
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message || "Something went wrong");
            }
        }
    })
    return (
        <Fragment>
            <div className=' d-flex '>
                <div style={{background:"#643959", height:"100vh", width:"40%"}} className="text-center d-flex flex-column justify-content-center align-items-center p-4">
                    <h2 className="text-white mb-3">Welcome Back!</h2>
                    <p className="text-white">To keep connect with us please login with your personal info</p><br />
                    {/* <p className="text-white mb-4">login with your personal info</p> */}
                    <button  className="btn btn-outline-light rounded-pill px-4" style={{background:"#643959"}} onClick={goToSignUp}>Sign In</button>
                </div>
                <div style={{ background: "#f8f9fa" }} className="d-flex flex-column justify-content-center align-items-center w-100 p-5">
                    <h1 className="mb-4">Create Account</h1>
                    <form onSubmit={formik.handleSubmit} noValidate>
                        <div className="mb-3 w-100 position-relative">
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0">
                            <GoPerson />
                            </span>
                            <input
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            type="text"
                            placeholder="Name"
                            className={`form-control border-start-0 ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`} 
                            name='name'
                            />
                            {formik.touched.name && formik.errors.name && (
                            <div className="invalid-feedback">{formik.errors.name}</div>
                            )}
                        </div>
                        </div>
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
                        <button type='submit' style={{background:"#F1AE32"}} className='btn rounded-pill w-100 mb-3 mt-3'>Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default SignIn;
