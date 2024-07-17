import React, { useEffect } from 'react'
import { Ibook } from '../interface/book'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
type Props = {
    setbook : (data : Ibook[]) => void
    book : Ibook[];
}
const List : React.FC<Props> = ({setbook,book}) => {
    const navigate = useNavigate()
    useEffect(()=>{
        const fetch = async ()=>{
            const {data} = await axios.get("http://localhost:3000/books");
            setbook(data);
        }
        fetch();
    },[])
  const handledelete = async(id:string)=>{ 
   try {
    if(confirm("bạn có muốn xóa")){
     await axios.delete(`http://localhost:3000/books/${id}`)
     setbook(book.filter(b => b.id !== id))
     navigate('/books')
    }
   } catch (error) {
    console.error("Error deleting product:", error);
   }
    }
  return (
    <div>
        <table>
            <thead>
                <tr>
                <th>tên</th>
                <th>giá</th>
                <th>tác giả</th>
                <th>năm sx</th>
                <th>hành động</th>
                </tr>
            </thead>
            <tbody>
            {book.map(data =>(
                <tr>
                    <th>{data.name}</th>
                    <th>{data.price}</th>
                    <th>{data.auth}</th>
                    <th>{data.year}</th>
                    <th>
                    <td>
                <Link to={`edit/${data.id}`} className="btn btn-warning btn-sm mr-2">Sửa</Link>
                <button onClick={() => handledelete(data.id)} className="btn btn-danger btn-sm">Xóa</button>
              </td>
                    </th>
                </tr>
               ))}
            </tbody>
        </table>
    </div>
  )
}

export default List;