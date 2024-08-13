import axios from 'axios'
import React, { useEffect, useState } from 'react'
import api from '../constants/BaseAPI'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
export default function Table() {

    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`${api}/api/product`)
            setProducts([...res.data])
        }
        fetch()
    }, [])

    const clickdelete = async (id) => {
        try {
            await axios.delete(`${api}/api/product/${id}`);
            setProducts(products.filter(p => p.id !== id));
            alert("xóa Thành công")
        } catch (error) {
            console.error("lỗi :", error);
            alert("lỗi")
        }

    }
    return (
        <>

            <div class="d-flex justify-content-center">
                <h2>Trang Chủ</h2>
            </div>
            <div>
                <a href='/add' className='btn btn-success mt-5 ms-5 mb-4'>Thêm Mới</a>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>
                            No
                        </th>
                        <th>
                            Product Name
                        </th>
                        <th>
                            Brand Name
                        </th>
                        <th>
                            Subcategory
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Status
                        </th>
                        <th>
                            function
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((p, i) =>
                            <tr key={p.id}>
                                <td>{i + 1}</td>
                                <td>{p.name}</td>
                                <td>{p.brand_name}</td>
                                <td>{p.sub_cate_name}</td>
                                <td>{p.price}</td>
                                <td>{p.status_name}</td>
                                <td>
                                    <Link className='btn btn-danger' to={`/update/${p.id}`}> Update </Link>
                                    <button className='btn btn-warning ms-2' onClick={() => clickdelete(p.id)}> delete </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}