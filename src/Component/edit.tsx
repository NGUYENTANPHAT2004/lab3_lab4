import React, { useEffect } from 'react'
import { Ibook } from '../interface/book'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
type Props = {
    setbook : (data : Ibook[]) => void
    book : Ibook[];
}
type FormType = Pick<Ibook, 'name' | 'price' | 'auth' | 'year'>;
const Edit : React.FC<Props> = ({setbook,book})=> {
    const navigate = useNavigate()
    const {register,handleSubmit,reset} = useForm<FormType>() 
    const {id} =useParams<{id:string}>()
    useEffect(()=>{
        const fetchid = async() =>{
         const {data} = await axios.get(`http://localhost:3000/books/${id}`);
         reset(data)
        }
        fetchid()
    },[])
    const onSubmit = async (FormData:FormType) =>{
        const {data} = await axios.put(`http://localhost:3000/books/${id}`,FormData);
        setbook(book.filter(b => (b.id === data.id ? data : b)))
        reset();
        navigate('/books')
    }
  return (
    <>
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
   <div>
    <label htmlFor="name">tên sp</label>
    <input type="text" className="form-control" id="name" {...register("name")} placeholder="Tên sản phẩm" required />
   </div>
   <div>
    <label htmlFor="price">giá</label>
    <input type="text" className="form-control" id="price" {...register("price")} placeholder="giá sản phẩm" required />
   </div>
   <div>
    <label htmlFor="auth">tác giả</label>
    <input type="text" className="form-control" id="auth" {...register("auth")} placeholder="tác giả sản phẩm" required />
   </div>
   <div>
    <label htmlFor="year">năm sx</label>
    <input type="text" className="form-control" id="year" {...register("year")} placeholder="năm sản phẩm" required />
   </div>
   <button type='submit'>gửi</button>
    </form>

    </div>
    </>
  )
}

export default Edit