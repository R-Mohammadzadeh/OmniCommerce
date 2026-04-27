"use client"
import { useState } from "react"

import { Star } from "lucide-react"

const StarRating = ({initialRating = 0, totalStars = 5, onRate, readonly = false }) => {
  const [rating, setRating] = useState(initialRating)
  const [hover, setHover] = useState(0)

  return (
    <div className="flex items-center gap-1"> 
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button 
            key={index} 
            type="button"
            className={`${readonly ? 'cursor-default' : 'cursor-pointer transition-transform hover:scale-110 active:scale-90'}`}   
            disabled={readonly} 
            onClick={() => {
              if(!readonly){
                setRating(starValue)
                if(onRate) onRate(starValue)
              }
            }} 
            onMouseEnter={() => !readonly && setHover(starValue)}
            onMouseLeave={() => !readonly && setHover(0)}
          >
           
            <Star
              size={18}
              className={`transition-colors ${
                starValue <= (hover || rating || initialRating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          </button>
        )
      })}

      {initialRating > 0 && (
        <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          {initialRating}
        </span>
      )}
    </div>
  )
}

export default StarRating