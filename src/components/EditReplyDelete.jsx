import React from 'react'
import reply from '/images/icon-reply.svg'
import delete_icon from '/images/icon-delete.svg'
import edit from '/images/icon-edit.svg'
import {currentUser} from '../../utils/data.json'

const EditReplyDelete = ({handleEdit,handleIsDeleting,
    handleReply , content}) => {

 

  return (
    <>
        {currentUser.username === content.user.username &&(
        <div onClick={handleIsDeleting} className='flex items-center gap-1 justify-center cursor-pointer active:opacity-40'>
        <img src={delete_icon} alt="reply" />
        <span className='text-softRed font-bold text-sm max-[820px]:mr-4'>Delete</span>
        </div>
        )}
        {currentUser.username=== content.user.username?(

            <div onClick={handleEdit} className='flex items-center gap-1 justify-center cursor-pointer active:opacity-40'>
            <img src={edit} alt="reply" />
            <span  className='text-moderateBlue font-bold text-sm'>Edit</span>
            </div>
        ):(
            <div  onClick={handleReply} className='flex items-center gap-1 justify-center cursor-pointer active:opacity-40'>
            <img src={reply} alt="reply" />
            <span className='text-moderateBlue font-bold text-sm'>Reply</span>
            </div>
        )}
   </>
  )
}

export default EditReplyDelete