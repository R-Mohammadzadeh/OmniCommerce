
export function getProductImage (product) {

// 1. check img
if(!product || !product.image || product.image.length === 0){
    return '/image/placeholder.jpg'
}

const imageName = product.image[0] ;


// 2.
const category = product.category?.toLowerCase()

// 

const folder = product.category.toLowerCase() + 's' ;

return `/image/${folder}/${product.image[0]}`   


}