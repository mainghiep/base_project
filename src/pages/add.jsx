import { useState, useEffect } from "react"
import axios from "axios";
import api from '../constants/BaseAPI'

export default function Add() {

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
    const [isSuccess, setIsSuccess] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setproduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSuccess = () => {
        setIsSuccess(true)
        setTimeout(() => {
            setIsSuccess(false)
        }, 2000);
    }

    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`${api}/api/product/brand`)
            setbrand([...res.data])
            const res1 = await axios.get(`${api}/api/product/subcate`)
            setsubcate([...res1.data])
            const res2 = await axios.get(`${api}/api/product/status`)
            setstatus([...res2.data])
        }
        fetch()
    }, [])

    const addbtn = async () => {

        try {
            const add = await axios.post(`${api}/api/product`, product);

            if (add.status === 200) {
                handleSuccess()
                setproduct({
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
            } else if (add.status === 400) {
                alert(`Có lỗi xảy ra: ${add.data.message}`);
            }
        } catch (error) {
            alert("Có lỗi xảy ra trong quá trình gửi dữ liệu.");
        }
    }
    return (
        <div className='container'>

            {isSuccess &&
                isSuccess &&

                <div className="toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true" style={{position: 'fixed',
                    top: 20, left:30}}>
                    
                    
                    <div className="d-flex">
                        <div class="toast-body">
                            Thêm thành công!
                        </div>
                        <button type="button" classNames="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick={() => setIsSuccess(false)}></button>
                    </div>
                </div>
            }
        
            
            <div className='d-flex justify-content-center'>
                <h1>Trang Thêm Mới</h1>
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
                        <option value="">--Lựa chọn--</option>
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
                        <option value="">--Lựa chọn--</option>
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
                        <option value="">--Lựa chọn--</option>
                        {
                            status.map((b) => (
                                <option key={b.id} value={b.id}>{b.statusname}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='d-flex justify-content-end mt-3 me-5 pb-3'>
                    <button className='btn btn-danger' onClick={addbtn}>Add</button>
                </div>
            </div>
        </div>
    )
}
