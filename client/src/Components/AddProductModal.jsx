import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { api } from '../axios';

const AddProductModal = ({ show, handleClose, onProductAdded }) => {
  const initialVariant = { ram: '', price: '', qty: 1 };

  const [variants, setVariants] = useState([initialVariant]);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  // const [allSubcategories, setAllSubcategories] = useState([]);

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const addVariant = () => {
    setVariants([...variants, initialVariant]);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const handleDiscard = () => {
    
    setVariants([initialVariant]);
    setImages([]);
    setTitle('');
    setCategory('');
    setSubcategory('');
    setDescription('');
    handleClose(); 
  };

  const handleAddProduct = async () => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subcategory', subcategory);
    formData.append('description', description);

    variants.forEach((variant, index) => {
      formData.append(`variants[${index}][ram]`, variant.ram);
      formData.append(`variants[${index}][price]`, variant.price);
      formData.append(`variants[${index}][qty]`, variant.qty);
    });

    images.forEach((image) => {
      formData.append('images', image);
    });

    const { data } = await api.post('/addproduct', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const newProduct = data?.product || values;

    // console.log("datas of product", data);
    // console.log("FormData", formData);
    
    if (onProductAdded) {
        onProductAdded(newProduct);  // pass the newly added product back to HomePage
    }

    toast.success("Product added successfully");

    
    handleDiscard(); 
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "Something went wrong");
  }
};

    // useEffect(()=>{
    //     const getAllSubs = async() =>{
    //     try {
    //         const {data} = await api.get("/getallsubcategories");
    //         console.log(data);
    //         const subs = data.flatMap(item => item.subcategory);
        
    //         setAllSubcategories(subs);
    //         // console.log("Subsss>>", allSubcategories); 
            
    //     } catch (error) {
    //         console.log(error?.message);
    //         toast.error(error?.response?.data?.message);
    //     }
    // }
    // getAllSubs()
    // },[])


  return (
    <Modal show={show} onHide={handleDiscard} size="lg" centered>
      <Modal.Title className="w-100 text-center mt-3 mb-0" style={{ fontSize: '20px', fontWeight: '600' }}>
        Add Product
      </Modal.Title>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group as={Row} className="align-items-center mb-3">
                <Form.Label column sm={4} className="mb-0 fw-semibold">Title :</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    placeholder="Enter product title"
                    className="shadow-sm"
                    style={{ borderRadius: '6px' }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Col>
              </Form.Group>

              {/* <Form.Group as={Row} className="align-items-center mb-3">
                <Form.Label column sm={4} className="mb-0 fw-semibold">Category :</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    placeholder="Category"
                    className="shadow-sm"
                    style={{ borderRadius: '6px' }}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </Col>
              </Form.Group> */}

              <Form.Group as={Row} className="align-items-center mb-3">
                <Form.Label column sm={4} className="mb-0 fw-semibold">Subcategory :</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    placeholder="Subcategory"
                    className="shadow-sm"
                    style={{ borderRadius: '6px' }}
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group as={Row} className="align-items-center mb-3">
                <Form.Label column sm={4} className="mb-0 fw-semibold">Description :</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    placeholder="Description"
                    className="shadow-sm"
                    style={{ borderRadius: '6px' }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="align-items-center mb-3">
                <Form.Label column sm={4} className="mb-0 fw-semibold">Images :</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                    className="shadow-sm"
                    style={{ borderRadius: '6px' }}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3">
            <Form.Label className="fw-semibold">Variants :</Form.Label>
            {variants.map((variant, index) => (
              <Row key={index} className="mb-2">
                <Col>
                  <Form.Control
                    placeholder="RAM"
                    value={variant.ram}
                    onChange={(e) => handleVariantChange(index, 'ram', e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="Price"
                    value={variant.price}
                    onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    min="1"
                    placeholder="Qty"
                    value={variant.qty}
                    onChange={(e) => handleVariantChange(index, 'qty', e.target.value)}
                  />
                </Col>
              </Row>
            ))}
            <Button variant="dark" size="sm" onClick={addVariant}>Add Variant</Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={handleAddProduct}>Add</Button>
        <Button variant="secondary" onClick={handleDiscard}>Discard</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;
