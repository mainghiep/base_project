import axios from 'axios';
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import api from '../constants/BaseAPI';


export default function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setproduct] = useState({
        name: '',
        color: '',
        quantity: '',
        price: '',
        sellPrice: '',
        originPrice: '',
        brandId: '',
        subCategoryId: '',
        statusId: ''
    })
    const [brand, setbrand] = useState([]);
    const [subcate, setsubcate] = useState([]);
    const [status, setstatus] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const getid = await axios.get(`${api}/api/product/${id}`)
            setproduct(getid.data)
            console.log(getid.data)
            const res = await axios.get(`${api}/api/product/brand`)
            setbrand(res.data)
            console.log(getid.data)
            const res1 = await axios.get(`${api}/api/product/subcate`)
            setsubcate(res1.data)
            const res2 = await axios.get(`${api}/api/product/status`)
            setstatus(res2.data)
        }
        fetch()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setproduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const btnupdate = async () => {
        try {
            const update = await axios.put(`${api}/api/product/${id}`, product)
            if (update.status === 200) {
                alert("Cật Nhật Thành Công !");
                navigate('/');
            } else {
                alert("Có lỗi sảy ra")
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    return (
        <>
            <div className='container'>
                <div className='d-flex justify-content-center'>
                    <h1>Trang Update</h1>
                </div>
                <div className='border border-3 border-warning mb-5' >

                    <div className='mt-3 me-5 ms-5'>
                        <span className="form-label"> Name :</span>
                        <input type="text" className="form-control" name="name" value={product.name} onChange={handleChange} />
                    </div>
                    <div className='mt-3 me-5 ms-5'>
                        <span className="form-label"> Color :</span>
                        <input type="text" className="form-control" name="color" value={product.color} onChange={handleChange} />
                    </div>
                    <div className='mt-3 me-5 ms-5'>
                        <span className="form-label"> Quality :</span>
                        <input type="number" className="form-control" name="quantity" value={product.quantity} onChange={handleChange} />
                    </div>
                    <div className='mt-3 me-5 ms-5'>
                        <span className="form-label"> Price :</span>
                        <input type="number" className="form-control" name="price" value={product.price} onChange={handleChange} />
                    </div>
                    <div className='mt-3 me-5 ms-5'>
                        <span className="form-label"> Sell price :</span>
                        <input type="number" className="form-control" name="sellPrice" value={product.sellPrice} onChange={handleChange} />
                    </div>
                    <div className='mt-3 me-5 ms-5'>
                        <span className="form-label"> Origin Price :</span>
                        <input type="number" className="form-control" name="originPrice" value={product.originPrice} onChange={handleChange} />
                    </div>
                    <div className='mt-3 me-5 ms-5'>
                        <span className="form-label"> Brand Name : </span>
                        <select className="form-control" name="brandId" value={product.brandId} onChange={handleChange}>
                                
                            {
                                brand.map((b) => (
                                    <option key={b.id} value={b.id}>{b.brandname}</option>
                                ))
                            }
                        </select>

                    </div>
                    <div className='mt-3 me-5 ms-5'>
                        <span className="form-label">SubcaTe Name : </span>
                        <select className="form-control" name="subCategoryId" value={product.subCategoryId} onChange={handleChange}>
                            
                            {
                                subcate.map((b) => (
                                    
                                    <option key={b.id} value={b.id}>{b.subcatename}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='mt-3 me-5 ms-5'>
                        <span className="form-label"> Status Name : </span>
                        <select className="form-control" name="statusId" value={product.statusId} onChange={handleChange}>
                                
                            {
                                status.map((b) => (
                                    <option key={b.id} value={b.id}>{b.statusname}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='d-flex justify-content-end mt-3 me-5 pb-3'>
                        <button className='btn btn-danger' onClick={btnupdate}>Update</button>
                    </div>
                </div>
            </div>
        </>
    )
}
