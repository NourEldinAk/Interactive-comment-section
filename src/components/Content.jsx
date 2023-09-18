import React, { useContext, useEffect, useState } from 'react'


import { CommentsContext } from '../App'
import DeleteLightBox from './DeleteLightBox'
import HandleScore from './HandleScore'
import EditReplyDelete from './EditReplyDelete'
import { formatDistanceToNow } from 'date-fns'
import {currentUser} from '../../utils/data.json'


const Content = ({content, isReplying,setIsReplying}) => {
    const [isUpdating, setIsUpdating] = useState(false)
    const {comments, setComments} = useContext(CommentsContext)
    const [textArea, setTextArea] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)

   
    const handleReply = (e)=>{
        e.preventDefault()
        if(isReplying){
            setIsReplying(false)
        }else{

            setIsReplying(true)
        }
    }

    const handleEdit = (e)=>{
        e.preventDefault()
        if(isUpdating){
            setIsUpdating(false)

        }else{
            setIsUpdating(true)

        }
    }
    
    const handleIsDeleting= ()=>{
        setIsDeleting(true)
    }

    const handleUpdate = (e)=>{
        e.preventDefault()
        if(content.replyingTo){
            setComments((prevComments)=>
            prevComments.map((comment)=>{
                        return{
                            ...comment,
                            replies: comment.replies?.map(reply=>{
                                if (reply.id === content.id){
                                    reply.content = textArea
                                }
                            return reply
                            })
                        }
                    })
    
            )
        }else{
            setComments((prevComments) =>
            prevComments.map((comment) => {
                if(comment.id === content.id){
                 comment.content = textArea
                }
                return comment
            })
          );
        }
    setIsUpdating(false)
    }


   

  return (
    <>
    <div className="flex p-2 w-full h-full max-[820px]:flex-col-reverse max-[820px]:items-start gap-3 items-center ">
    <div className='bg-lightGray h-[100px] max-[820px]:mobile-score rounded-lg w-[40px] flex flex-col items-center  justify-center gap-4 '>
        <HandleScore content={content}/>
   

    </div>
    <div className=" min-[820px]:hidden w-1/5 ml-auto mt-auto px-3 relative">
    <div className='flex items-center gap-4 justify-center absolute right-1 position-reply '>

    <EditReplyDelete handleIsDeleting={handleIsDeleting}
             handleEdit={handleEdit} handleReply={handleReply} 
             isUpdating={isUpdating} content={content} 
                />
    </div>

</div>
    <div className="flex w-full flex-col gap-3 h-full">
    <div className="flex justify-between w-full px-3">
    <div className="flex items-center  gap-2">
        <img src={content.user.image.png} width={30} alt="user" />
        <span className='font-semibold'>{content.user.username}</span>
        {currentUser.username === content.user.username&& (
            <span className='bg-moderateBlue px-[5px] py-[1px] mr-1 text-white text-xs  font-semibold'>you</span>
        )}
        <span className='text-grayBlue'>{!isNaN(content.createdAt)?`${formatDistanceToNow(content.createdAt)} ago` :content.createdAt}</span>
    </div>
    <div className='flex items-center gap-4 justify-center max-[820px]:hidden '>

            <EditReplyDelete handleIsDeleting={handleIsDeleting}
             handleEdit={handleEdit} handleReply={handleReply}
             isUpdating={isUpdating} content={content} 
                />
    </div>

</div>
        <div className='px-3 '>
            {isUpdating?(
          <textarea className='w-full h-4/5 outline-none focus:border-moderateBlue
          focus:border-[1px] border-2 border-lightGray rounded-lg 
          px-3 py-2 text-start flex flex-wrap resize-none' onChange={(e)=>{setTextArea(e.target.value)}}
           type="text" cols="30" rows="4" defaultValue={content.content}></textarea>)
            :(
            <p className='text-grayBlue'>{content.content}</p>
            )}
        </div>
        {isUpdating &&(
            <div className='ml-auto '>
                <button onClick={handleUpdate} className='bg-moderateBlue text-white
                 px-5 py-[10px] rounded-lg  uppercase text-sm font-semibold'>
                  Update
                </button>
            </div>
        )}
    </div>
{isDeleting && (
    <DeleteLightBox setIsDeleting={setIsDeleting} content={content}/>
)}
</div>
</>
  )
}


export default Content