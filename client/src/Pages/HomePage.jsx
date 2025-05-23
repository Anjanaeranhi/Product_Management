import React, { Fragment } from 'react';
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";

const HomePage = () => {
    return (
        <Fragment>
            <div>
                <div className='d-flex justify-content-center align-items-center' style={{ height: "70px", background: "#643959" }}>
                    <div className="w-25">
                        <div className="d-flex align-items-center rounded bg-white px-3" style={{ overflow: "hidden" }}>
                            <input
                                type="text"
                                className="form-control border-0 "
                                placeholder="Search any things"
                                aria-label="Search"
                            />
                            <button style={{marginRight:"-20px", background:"#F1AE32", color:"black"}} className="btn rounded px-4" type="button">
                                Search 
                            </button>
                        </div>
                    </div>
                    <div className=' d-flex ' style={{marginLeft:"30%"}}>
                        <CiHeart size={30} />
                        <div  style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            background: "#F1AE32",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            
                            
                        }}><span style={{fontSize:"13px"}}>0</span></div>
                        <p className='mx-2' style={{
                            color:"white",
                        }}>Sign In</p>
                        <CiShoppingCart size={30}/>
                        <div  style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            background: "#F1AE32",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white"   
                        }}><span style={{fontSize:"13px"}}>0</span></div>
                        <p className='ms-2' style={{
                            color:"white",
                        }}>Cart</p>
                    </div>
                </div>

                <div className='m-4 d-flex justify-content-between'>
                    <p>Home &gt;</p>
                    <div >
                        <button className='btn mx-3' style={{background:"#F1AE32"}}>Add catagory</button>
                        <button className='btn mx-3' style={{background:"#F1AE32"}}>Add sub catagory</button>
                        <button className='btn mx-3' style={{background:"#F1AE32"}}>Add product</button>
                    </div>
                </div>

                <div className='d-flex m-4'>
                    <div>
                        <p style={{color:"#643959"}}><strong>Catagories</strong></p>
                    </div>
                    <div>ghfghfgt</div>
                </div>
            </div>
        </Fragment>
    );
}

export default HomePage;
