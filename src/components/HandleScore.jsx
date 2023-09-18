import React, { useContext, useEffect, useState } from 'react'
import { CommentsContext } from '../App'
import plus from '/images/icon-plus.svg'
import minus from '/images/icon-minus.svg'

const HandleScore = ({content}) => {
    const {comments, setComments} = useContext(CommentsContext)
    const [votedToPlus, setVotedToPlus] = useState([]) // Array to ensure the user votes only once
    const [votedToMinus, setVotedToMinus] = useState([]) // Array to ensure the user votes only once

    const plusArrayFromLocal = JSON.parse(localStorage.getItem('votedToPlus',votedToPlus))
    const minusArrayFromLocal = JSON.parse(localStorage.getItem('votedToMinus',votedToMinus))

    useEffect(()=>{
        if(minusArrayFromLocal || plusArrayFromLocal){
            
            setVotedToMinus(minusArrayFromLocal)
            setVotedToPlus(plusArrayFromLocal)
            
        }else{
            localStorage.setItem('votedToPlus',JSON.stringify(votedToPlus))
            localStorage.setItem('votedToMinus',JSON.stringify(votedToMinus))
        }
    },[])

    useEffect(()=>{
        if(votedToPlus.length !== 0 || votedToMinus.length !== 0)
        localStorage.setItem('votedToPlus',JSON.stringify(votedToPlus))
        localStorage.setItem('votedToMinus',JSON.stringify(votedToMinus))
    },[votedToMinus,votedToPlus])


    const handleScore = (e)=>{

        const name = e.target.dataset.name
        if (name === 'plus' && !votedToPlus.includes(content.id)) {
            setVotedToPlus(prevValues => [...prevValues, content.id]);
        
            if (votedToMinus.includes(content.id)) {
                setVotedToMinus(prevValues => prevValues.filter(id => id !== content.id));
            }
        } else if (name === 'minus' && !votedToMinus.includes(content.id)) {
            setVotedToMinus(prevValues => [...prevValues, content.id]);
        
            if (votedToPlus.includes(content.id)) {
                setVotedToPlus(prevValues => prevValues.filter(id => id !== content.id));
            }
        } else {
            return; // No change needed
        }
        

        if (content.replyingTo){
            setComments((prevComments)=>{
                return prevComments.map((comment)=>{
                    return{
                        ...comment,
                        replies: comment.replies.map(reply=>{
                            if(e.target.dataset.name ==='plus' && content.id === reply.id){
                                return{
                                    ...reply,
                                    score: reply.score+1
                                }
                            }else if(e.target.dataset.name ==='minus' && content.id === reply.id){
                                
                                return{
                                    ...reply,
                                    score:reply.score-1
                                }
                            }
                            return reply
                        })
                    }
                })
            })
        }else{

            setComments((prevComments)=>{
               return prevComments.map(comment=>{
                    if(e.target.dataset.name ==='plus' && comment.id === content.id){
                        return {
                            ...comment,
                            score: comment.score+1
                        }
                    }else if(e.target.dataset.name ==='minus' && comment.id === content.id){
                        return {
                            ...comment,
                            score: comment.score-1
                        }    
                    }
                return comment
                })
            })
        }
    

    }
  return (
    <>
        <img src={plus} onClick={handleScore} data-name='plus' className='active:brightness-200 cursor-pointer' alt="plus" />
        <span className='text-moderateBlue font-bold text-sm'>{content.score}</span>
        <img src={minus} onClick={handleScore} data-name='minus' className='active:brightness-200 cursor-pointer' alt="minus" />
    </>
  )
}

export default HandleScore