import React, { useContext, useEffect, useState } from 'react'
import {currentUser} from '../../utils/data.json'
import { CommentsContext } from '../App'
import uuid from 'react-uuid'

const AddComment = ({buttonTitle, isReplying, commentData,setIsWriting , replyingToReply,content}) => {
  
  const [comment, setComment] = useState(isReplying?`@${commentData?.user?.username} `: '')  
  const {comments, setComments} = useContext(CommentsContext)

  useEffect(()=>{
    if (replyingToReply){
      setComment(`@${content.user.username} `)
    }

  },[])

  const handleComment = (e) => {
    e.preventDefault();
    if(comment === '' || comment === commentData?.user?.username){
      return
    }

    const newComment = {
      id: uuid(),
      content: comment,
      createdAt:new Date().getTime(),
      score: 0,
      user: currentUser,
    };
  
    if (isReplying) {
      newComment.replyingTo = commentData.user.username;
  
      setComments((prevComments) =>
        prevComments.map((item) => {
          if (item.id === commentData.id) {
            return {
              ...item,
              replies: [...item.replies, newComment], // Add the new reply to the replies array
            };
          }
          return item;
        })
      );

      setIsWriting(false)
    } else {
      newComment.replies = [];
      setComments((prevComments) => [...prevComments, newComment]); // Add the new comment to the comments array
    }


    setComment('')

  };
  

  return (
    <form className='h-full w-full mx-auto rounded-lg max-[820px]:pb-2 bg-white max-[820px]:mobile-form'>
      <div >
      <textarea className='w-4/5 h-4/5 outline-none focus:border-moderateBlue
           focus:border-[1px] border-2 border-lightGray rounded-lg 
           px-3 py-2 text-start flex flex-wrap resize-none min-[820px]:hidden mx-auto mt-3'
            type="text" placeholder='Add a comment...'
             name="message" cols="30" rows="3"
             value={comment}
             onChange={(e)=>{setComment(e.target.value)}}
             > </textarea>
      </div>
        <div className="flex px-5 w-full h-full gap-3 justify-between items-start pt-5 max-[820px]:pt-0 max-[820px]:items-end max-[820px]:pb-3">
          <img src={currentUser.image.png} width={36} alt="user" />
          <textarea className='w-4/5 h-4/5 outline-none focus:border-moderateBlue
           focus:border-[1px] border-2 border-lightGray rounded-lg 
           px-3 py-2 text-start flex flex-wrap resize-none max-[820px]:hidden'
            type="text" placeholder='Add a comment...'
             name="message" cols="30" rows="3"
             value={comment}
             onChange={(e)=>{setComment(e.target.value)}}
             >

          </textarea>
          <button onClick={handleComment} className='bg-moderateBlue text-white px-6 py-[10px]
           rounded-lg uppercase text-sm font-semibold active:opacity-40'>
            {buttonTitle || 'Send'}
            </button>
        </div>
    </form>
  )
}

export default AddComment