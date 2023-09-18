import React, { useContext, useState } from 'react'
import Content from './Content'
import AddComment from './AddComment'

const Reply = ({content,commentDetails}) => {
  const [isReplying , setIsReplying] = useState(false)

  return (
    <>
    <div className='w-4/5 min-h-[150px] bg-white rounded-lg max-[820px]:w-full '>
      <div className='h-full w-full p-2  '>
      <Content content ={content} isReplying={isReplying} setIsReplying={setIsReplying}/>
      </div>
    </div>
    {isReplying && (
    <div className='w-4/5 h-[150px] flex  max-[820px]:w-full max-[820px]:mb-3'>
      {/* the prop "isReplying" is to determine if it's a comment or a reply */}
        <AddComment isReplying={true} content={content} replyingToReply={true} setIsWriting={setIsReplying} commentData={commentDetails} buttonTitle='Reply'/>
    </div>
      )}

    </>

  )
}

export default Reply