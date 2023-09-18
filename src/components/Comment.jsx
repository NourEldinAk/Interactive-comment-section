import Reply from './Reply'

import Content from './Content'
import AddComment from './AddComment'
import { useState } from 'react'

const Comment = ({commentContent}) => {
    const [isCommenting , setIsCommenting] = useState(false)

  return (
    <>
    <div className='h-full  w-[700px] max-[820px]:w-[400px] flex flex-col gap-3 items-end mx-auto '>
    <div className='w-full min-h-[150px]  bg-white rounded-lg p-3'>
        <Content content={commentContent} isReplying={isCommenting} setIsReplying={setIsCommenting}/>

    </div>
    {isCommenting && (
        <div className='w-[700px] h-[150px] flex'>

            <AddComment isReplying={true} replyingToReply={false} commentData={commentContent} setIsWriting={setIsCommenting} buttonTitle='Reply'/>
        </div>
        )}
    <div className="w-full flex flex-col items-end justify-center [&>*:last-child]:mb-3 gap-3 border-l-2">
        {commentContent.replies.length>0 && (
            commentContent.replies.map((reply)=>(
                <Reply commentDetails={commentContent} content={reply} key={reply.id}/>
                ))
            )}
    </div> 
    </div>

    </>
    
  )
}

export default Comment