// import UsersData from "@/models/UsersData";
// import connectDB from "@/config/connectDB";
// import bcrypt from "bcryptjs"; 

// export async function POST(req) {
//   try {
//     await connectDB();

//     const { email, password } = await req.json();

//     // 1. Validation for empty fields
//     if (!email || !password) {
//       return Response.json(
//         { message: "Invalid data: Email and password are required" },
//         { status: 422 }
//       );
//     }

//     // 2. Check if user already exists
//     const emailExist = await UsersData.findOne({ email }).select('_id');
//     if (emailExist) {
//       return Response.json(
//         { message: "User already exists" },
//         { status: 409 }
//       );
//     }

//     // 3. Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 12);

//     // 4. Create user with hashed password
//     const newUser = await UsersData.create({ email, password: hashedPassword });

//     return Response.json(
//       { message: "User added successfully to database" , userId : newUser._id ,
//        error : false 
//       },
//       { status: 201 }
//     );

//   } catch (error) {
//     console.error("Registration Error:", error);
//     return Response.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }