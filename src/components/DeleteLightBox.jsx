import React, { useContext } from 'react'
import { CommentsContext } from '../App'
import {currentUser} from '../../utils/data.json'

const DeleteLightBox = ({setIsDeleting,content}) => {
    const {comments, setComments} = useContext(CommentsContext)

    const handleDelete= (e)=>{
        e.preventDefault()
        if(content.replyingTo){
            setComments((prevComments)=>
            prevComments.map((comment)=>{
                        return{
                            ...comment,
                            replies: comment.replies.filter(reply=>{
                                return reply.id !== content.id
                            })
                        }
                    })
    
            )
        }else{
            setComments((prevComments) =>
            prevComments.filter((comment) => {
                return comment.id !== content.id;
            })
          );
        }

    setIsDeleting(false)
    }


  return (
    <div className='fixed min-h-full w-full bg-[#000000bf] flex items-center justify-center top-0 left-0'>
        <div className='bg-white w-[320px] h-[200px] flex justify-center items-start flex-col p-5 rounded-lg gap-4'>
        <h1 className='text-lg font-bold text-darkBlue'>Delete Comment</h1>
        <p className='text-grayBlue text-sm'>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <div className='flex gap-5 '>
            <button onClick={()=>setIsDeleting(false)} className='active:opacity-40 px-6 font-semibold py-3 rounded-lg text-white bg-grayBlue text-sm' >NO, CANCEL</button>
            <button onClick={handleDelete} className='active:opacity-40 px-6 font-semibold py-3 rounded-lg text-white bg-softRed text-sm'>YES, DELETE</button></div>
        </div>
    </div>
  )
}

export default DeleteLightBox