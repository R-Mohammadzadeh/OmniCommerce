import connectDB from "@/config/connectDB";
import UsersData from "@/models/UsersData";





export default async function UsersPage () {

await connectDB() ;

const users = await UsersData.find({}).lean().sort({ createdAt: -1 });

return (
<>
<div className="container mx-auto px-4 py-8 bg-gray-100 rounded-lg shadow-md mt-16 ">
<h1 className="text-2xl font-bold mb-4 ">users page</h1>
<ul className="space-y-2 *:bg-white p-4 rounded-lg shadow-md ">
    {users.map((user) => (
        <li key={user._id} className="p-4 bg-white rounded-lg shadow-md *:hover:bg-gray-50 transition-colors duration-200 *:cursor-pointer ">
            <strong>{user.email}</strong>
        </li>
    ))}
</ul>
</div>
</>
)
}