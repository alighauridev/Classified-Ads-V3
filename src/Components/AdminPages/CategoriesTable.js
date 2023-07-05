import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Modal, Button, Form } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../http/axiosSet';
import { toast } from "react-toastify";
// import { listCategories } from "../../Redux/actions/categoryActions";

const CategoriesTable = () => {
    const [categories, setCategories] = useState([]);
    const [activeModal, setActiveModal] = useState(null); // to track currently active modal
    const [categoryName, setCategoryName] = useState(''); // holds the name of the category being edited
    const dispatch = useDispatch();
    const handleModalOpen = (categoryId, categoryName) => {
        setActiveModal(categoryId);
        setCategoryName(categoryName);
    };

    const handleModalClose = () => {
        setActiveModal(null);
        setCategoryName('');
    };
    const fetchCategories = async () => {
        try {
            const res = await axios.get("/api/v1/categories");
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {

        fetchCategories();
    }, []);
    const handleUpdate = async () => {
        // Call the update category API
        try {
            const res = await axios.patch(`/api/v1/categories/${activeModal}`, { name: categoryName });
            console.log(res.data);
            // dispatch(listCategories())
            toast.success('category updated!')
        } catch (err) {
            console.error(err);
            toast.error('category updating fail!')
        }
        handleModalClose();
    };

    const handleDelete = async (categoryId) => {
        // Call the delete category API
        try {
            const res = await axios.delete(`/api/v1/categories/${categoryId}`);
            // dispatch(listCategories())
            toast.success('category deleted!')
        } catch (err) {
            console.error(err);
            toast.error('category deleting fail!')
        }
    };

    return (
        <div className="" style={{
            height: '62vh',
            overflow: 'auto'
        }}>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th className="text-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories &&
                        categories.map((category) => {
                            return (
                                <tr key={category._id}>
                                    <td>
                                        <b>{category.name}</b>
                                    </td>
                                    <td className="text-end">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                <i className="fas fa-ellipsis-h"></i>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => handleModalOpen(category._id, category.name)}>Edit info</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleDelete(category._id)}>Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        {/* Edit category modal */}
                                        <Modal show={activeModal === category._id} onHide={handleModalClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Edit Category</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Category Name</Form.Label>
                                                        <Form.Control type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)} />
                                                    </Form.Group>
                                                </Form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleModalClose}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={handleUpdate}>
                                                    Save Changes
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th className="text-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories &&
                        categories.map((category) => {
                            return (
                                <tr key={category._id}>
                                    <td>
                                        <b>{category.name}</b>
                                    </td>
                                    <td className="text-end">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                <i className="fas fa-ellipsis-h"></i>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => handleModalOpen(category._id, category.name)}>Edit info</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleDelete(category._id)}>Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        {/* Edit category modal */}
                                        <Modal show={activeModal === category._id} onHide={handleModalClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Edit Category</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Category Name</Form.Label>
                                                        <Form.Control type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)} />
                                                    </Form.Group>
                                                </Form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleModalClose}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={handleUpdate}>
                                                    Save Changes
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default CategoriesTable;
