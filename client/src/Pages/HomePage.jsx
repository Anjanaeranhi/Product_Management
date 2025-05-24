import React, { Fragment, useEffect, useState } from 'react';
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import toast from 'react-hot-toast';
import { Modal, Button, Form } from 'react-bootstrap';
import AddProductModal from '../Components/AddProductModal';
import { api } from '../axios';
import { FaHeart } from "react-icons/fa";

const HomePage = () => {
    const [wishItems, setWishItems] = useState([]);
    const [expandedCategoryId, setExpandedCategoryId] = useState(null);

    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    const [showSubcategoryModal, setShowSubCategeryModal] = useState(false);
    const [subcategoryName, setSubCategoryName] = useState("");
    const [category, setCategory] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [product, setProduct] = useState([]);
    const [categ, setCateg] = useState([]);
    

    const {userData} = useSelector(states => states.User);
    const dispatch = useDispatch();
    // console.log("UserData>>", userData);

    const handleOpenModal = () => setShowCategoryModal(true);
    const handleCloseModal = () => {
        setShowCategoryModal(false);
        setCategoryName("")
    }

    const handleSubModalOpen = () => setShowSubCategeryModal(true);
    const handleSubModalClose = () => {
        setShowSubCategeryModal(false);
        setSubCategoryName("")
    }
    const handleToggleCategory = (id) => {
        if (expandedCategoryId === id) {
            setExpandedCategoryId(null); // collapse if already expanded
            setSubCateg([]); // clear subcategories when collapsed if you want
        } else {
            setExpandedCategoryId(id); // expand new category
            getSubcategories(id); // fetch subcategories for new category
        }
    }


    const handleAddCategory = async(values) =>{
        try {
            const {data} = await api.post("/addcategory", values)
            handleCloseModal();
            toast.success(data.message);
            const res = await api.get("/getcategory");
            setCateg(res.data);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    }
    

    useEffect(()=>{
        const getCategory = async() =>{
            try {
                const {data} = await api.get("/getcategory");
                setCateg(data);
                  
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message || "Something went wrong")
            }
        }
        getCategory()
    },[]);
    const [subCateg, setSubCateg] = useState([]);

    const getSubcategories = async(id) =>{
        try {
            const {data} = await api.post("/getsubcategories", {id});
            setSubCateg(data);
            setExpandedCategoryId(id)
            console.log(data);
            
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    }

   

    const handleAddSubCategory = async(values) =>{
        try {
            const {data} = await api.post("/addsubcategory",values)
            handleSubModalClose();
            
            // const res = await api.post("/getsubcategories", { id: values.category });
            // setSubCateg(res.data);
            // setExpandedCategoryId(values.category);
            toast.success(data.message);
            
            
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    }

    useEffect(()=>{
        const ShowProducts = async() =>{
            try {
                const {data} = await api.get("/products");
                console.log(data);
                setProduct(data);

            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message || "Something went wrong")
            }
        }
        ShowProducts()
    },[])
    
    return (
        <Fragment>
            <div>
                <div className='d-flex justify-content-center align-items-center' style={{ height: "70px", background: "#643959" }}>
                    <div className="w-25">
                        <div className="d-flex align-items-center rounded bg-white px-3" style={{ overflow: "hidden" }}>
                            <input type="text" className="form-control border-0 " placeholder="Search any things" aria-label="Search"/>
                            <button style={{marginRight:"-20px", background:"#F1AE32", color:"black"}} className="btn rounded px-4" type="button">Search</button>
                        </div>
                    </div>
                    <div className=' d-flex ' style={{marginLeft:"30%"}}>
                        <CiHeart size={30} />
                        <div  style={{width: "20px",height: "20px",borderRadius: "50%",background: "#F1AE32",display: "flex",justifyContent: "center",alignItems: "center",color: "white" }}>
                            <span style={{fontSize:"13px"}}>0</span>
                        </div>
                        <span className='mx-2' style={{ color:"white" }}>Sign In</span>
                            <CiShoppingCart size={30}/>
                            <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#F1AE32", display: "flex", justifyContent: "center", alignItems: "center", color: "white" }}>
                                <span style={{fontSize:"13px"}}>0</span>
                            </div>
                            <span className='ms-2' style={{ color:"white" }}>Cart</span>
                    </div>
                </div>

                <div className='m-4 d-flex justify-content-between'>
                    <p>Home &gt;</p>
                    <div >
                        <button className='btn mx-3' style={{background:"#F1AE32"}} onClick={handleOpenModal}>Add category</button>
                        <button className='btn mx-3' style={{background:"#F1AE32"}} onClick={handleSubModalOpen}>Add sub catagory</button>
                        <button className='btn mx-3' style={{background:"#F1AE32"}} onClick={() => setShowModal(true)}>Add product</button>
                    </div>
                </div>

                <div className='d-flex m-4' style={{height:"100vh"}}>
                    <div className='bg-light w-25 p-4'>
                    <p style={{color:"#643959"}}><strong>Categories</strong></p>
                    <p>All categories</p>
                    {categ.map((cat) => (
                        <div key={cat._id}>
                        <div className="mb-2 d-flex justify-content-between align-items-center px-2 py-1 bg-light rounded">
                            <div className="fw-semibold text-dark">{cat.category}</div>
                            <div className="text-muted" style={{ cursor: "pointer" }} onClick={() => handleToggleCategory(cat._id)}>&gt;</div>
                        </div>

                        {expandedCategoryId === cat._id && (
                            <div className="ms-3 mt-2">
                            {subCateg.length > 0 ? (
                                subCateg.map((subcat) => (
                                <div
                                    key={subCateg._id}
                                    className="px-2 py-1 bg-white rounded border mb-1"
                                >
                                    {subcat}
                                </div>
                                ))
                            ) : (
                                <div className="text-muted">No subcategories found</div>
                            )}
                            </div>
                        )}
                        </div>
                    ))}
                    </div>

                    <div className="d-flex flex-wrap gap-4 ms-5">
                        {product.map((item) => (
                            <Card key={item._id} style={{ width: '18rem' }}>
                                
                            <Card.Img variant="top" src={`http://localhost:8080/uploads/${item.images[0]}`} alt='Image not found'/>
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>
                                {item.variants.map((variant, index) => (
                                    <div key={index} className='d-flex justify-content-between'>
                                        <p>${variant.price}</p>
                                        <FaHeart
                                        className="fs-4"
                                        onClick={() => {
                                            const isWished = wishItems.find(
                                            (item) => item?._id === product?._id
                                            );
                                            if (isWished) {
                                            removeWishlist({ userId, productId: product?._id });
                                            } else {
                                            setRed({ userId, product });
                                            }
                                        }}
                                        style={{
                                            color: wishItems.find((item) => item?._id === product?._id)
                                            ? "red"
                                            : "grey",
                                            cursor: "pointer",
                                        }}
                                        />
                                    </div>
                                ))}
                                </Card.Text>
                            </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
                <Modal
                show={showCategoryModal}
                onHide={handleCloseModal}
                centered
                dialogClassName="small-modal"
                >
                <Modal.Body style={{padding: "24px",borderRadius: "12px",backgroundColor: "#fff",boxShadow: "0 10px 30px rgba(0,0,0,0.1)",}}>
                    <h5 style={{ marginBottom: "16px", fontWeight: "600", textAlign: "center" }}>Add Category</h5>
                    <Form>
                    <Form.Group>
                        <Form.Control type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Enter category name" style={{padding: "10px 12px",borderRadius: "8px",border: "1px solid #ccc",marginBottom: "20px",}}/>
                    </Form.Group>
                    <div style={{display: "flex",justifyContent: "space-between",gap: "10px",}}>
                        <Button variant="outline-secondary" onClick={handleCloseModal} style={{flex: 1,padding: "8px 0",borderRadius: "8px",fontWeight: "500",}}>Discard</Button>
                        <Button onClick={() => handleAddCategory({ category: categoryName })} style={{flex: 1,padding: "8px 0",backgroundColor: "#F1AE32",border: "none",borderRadius: "8px",fontWeight: "500",color: "#fff",}}>Add</Button>
                    </div>
                    </Form>
                </Modal.Body>
                </Modal>

                <Modal show={showSubcategoryModal} onHide={handleSubModalClose} centered dialogClassName="small-modal">
                <Modal.Body
                    style={{padding: "24px",borderRadius: "12px",backgroundColor: "#fff",boxShadow: "0 10px 30px rgba(0,0,0,0.1)",}}>
                    <h5 style={{ marginBottom: "16px", fontWeight: "600", textAlign: "center" }}>Add Sub Category</h5>
                    <Form>
                        <Form.Group>
                        <Form.Control type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter category name" style={{ padding: "10px 12px",borderRadius: "8px",border: "1px solid #ccc",marginBottom: "20px",}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" value={subcategoryName} onChange={(e) => setSubCategoryName(e.target.value)} placeholder="Enter subcategory name" style={{ padding: "10px 12px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "20px", }} />
                    </Form.Group>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", }} >
                        <Button variant="outline-secondary" onClick={handleSubModalClose} style={{ flex: 1, padding: "8px 0", borderRadius: "8px", fontWeight: "500", }} > Discard </Button>
                        <Button onClick={() => handleAddSubCategory({ subcategory: subcategoryName , category: category})} style={{ flex: 1, padding: "8px 0", backgroundColor: "#F1AE32", border: "none", borderRadius: "8px", fontWeight: "500", color: "#fff", }} > Add </Button>
                    </div>
                    </Form>
                </Modal.Body>
                </Modal>
                <AddProductModal show={showModal} handleClose={() => setShowModal(false)} />

            </div>
        </Fragment>
    );
}

export default HomePage;
