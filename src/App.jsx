import { createContext, useEffect, useState } from 'react'
import Comment from './components/comment'
import AddComment from './components/AddComment'
import data from '../utils/data.json'

export const CommentsContext = createContext()
function App() {
  const [comments, setComments] = useState(JSON.parse(localStorage.getItem('comments')) || data.comments)  
  

  useEffect(()=>{
  const jsonData = JSON.parse(localStorage.getItem('comments'))
  if(!jsonData){
    localStorage.setItem('comments',JSON.stringify(data.comments))
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('comments',JSON.stringify(comments))
  },[comments])

  return (
    <>
    <main className='w-[800px] max-[820px]:w-[500px] flex h-full mx-auto  '>
      <CommentsContext.Provider value={{comments, setComments}}>
      <div className='w-full my-10 h-full flex flex-col'>
      {comments.map((comment)=>(
        <Comment commentContent={comment} key={comment.id}/>
        ))}
      <div className='h-[120px] w-[700px] max-[820px]:w-[400px] mx-auto  mt-5'>
      <AddComment/>
      </div>
      </div>
      </CommentsContext.Provider>
    </main>
    </>
  )
}

export default App
