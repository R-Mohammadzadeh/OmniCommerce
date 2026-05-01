"use client"

import { useState } from "react"
import StarRating from "./StartRating"
import { toast } from "sonner"
import { addReviewAction } from "@/app/actions/addReviewAction"






export default function ProductReviews({product}) {

const[comment , setComment] = useState('')
const[rating , setRating] = useState(0)
const[pending , setPending] = useState(false)

const handleSabmit = async (e) => {
setPending(true)
e.preventDefault() ;
if(rating === 0) return toast.error("Please select a rating")

// action server
const reviewData = {
    user : 'Reza User',
    rating,
    comment,
}

const result = await addReviewAction(product._id , reviewData)

if(result.success){
    toast.success(result.message)
    setComment('')
    setRating(0)
}else{
    toast.error(result.message)
}


toast.success("Thank you for your review!")
setComment('')
setRating(0)
setPending(false)
}


return (

 <>
<div className="mt-12 p-6 bg-gray-50 dark:bg-slate-900 rounded-2xl">
<h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>

{/* Comment Area */}
<form onSubmit={handleSabmit} className="mb-10 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
<p className="mb-2 font-medium">Write a Review</p>
<div className="mb-4">
    <StarRating initialRating={rating} readonly={false} onRate={(val) => setRating(val)}/>
</div>

<textarea className="w-full p-3 rounded-lg border dark:bg-slate-700 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none "
 value={comment} rows={3} required
   onChange={(e) => setComment(e.target.value)}  
   placeholder="Share your thoughts about this product..." />

<button className="mt-3 bg-blue-600 
 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
 disabled={pending}>
     {pending ? "Sending..." : "Submit Review"}
Submit Review
</button>

{/* commentar list */}

<div className="space-y-4">
{product.reviwes?.length > 0 ? (
    
    product.reviwes.map((rev , index) => (
        <div className="border-b dark:border-slate-700 pb-4" key={index}   >
        <div className="flex justify-between items-center mb-1">
        <span className="font-bold">{rev.user}</span>
        <span className="text-xs text-gray-400">{new Date(rev.createdAt).toLocaleDateString()}</span>
        </div> 
        <StarRating initialRating={Number(product.rating.toFixed(1))} readonly={true} />   
        <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">{rev.comment}</p>
        </div>
    ))
) : (<p className="text-gray-500 italic">No reviews yet. Be the first!</p>)}
</div>
</form>
</div>

</>
)
}
