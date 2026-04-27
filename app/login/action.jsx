// "use server"

// import connectDB from "@/config/connectDB"
// import { createToken } from "@/lib/jwt";
// import UsersData from "@/models/UsersData";
// import { cookies } from "next/headers";
// import bcrypt from "bcryptjs";
// import { revalidatePath } from "next/cache";

// export default async function LoginAction (formData){

// try{
// // Connect to the database
// await connectDB() ;

// const email = formData.get('email')?.trim().toLowerCase();
// const password = formData.get('password')?.toString() || "";

// // 1.user check 
// const user = await UsersData.findOne({email});
// if(!user) {
//     return {error : true , message : "User not found!"}
// }

// // 2.password check
// const isMatch = await bcrypt.compare(password , user.password)
// if(!isMatch){
//     return {error : true , message : "Invalid credentials!"}
// }

// // Add login time before token creation
// await UsersData.findByIdAndUpdate(user._id , {
//     lastLogin : new Date()
// })
// // 3.token generation
// const token = await createToken({
// userId :user._id.toString() ,
// email : user.email ,
// role : user.role
// });

// // 4.cookie set
// const cookieStore = await cookies();
// cookieStore.set('token' , token , {
//     httpOnly:true , 
//     sameSite : 'lax' ,     
//     secure : process.env.NODE_ENV === 'production' ,
//     maxAge : 7 * 24 * 60 * 60 , // 7 days
//     path : '/' ,
// })

// revalidatePath('/' , 'layout')

// return {error : false , message : "Welcome back !" ,role: user.role }

// }
// catch(error){
//     console.error(error)
// return {error : true , message : "Something went wrong !"}
// }




// }