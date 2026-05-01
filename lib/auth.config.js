// lieb/auth.config.js


export const authConfig = {

pages : {
  signIn : '/login'
},

session : {
  strategy : 'jwt',
  maxAge : 30 * 24 * 60 *  60 , //30 days
  updateAge : 24 * 60 * 60 // 24 hours
},


callbacks : {
  authorized({auth , request :{nextUrl}}){
   return !! auth ;
  },

  async jwt({token , user}) {

    if(user){
      token.role = user.role ;
      token.createdAt = user.createdAt;
      token.lastLogin = user.lastLogin ; 
    } 
   return token
  },

 async session({session , token}){
  // Daten vom Token in die Session übertragen
  if(token && session.user){
    session.user.role = token.role;
    session.user.createdAt = token.createdAt;
    session.user.lastLogin = token.lastLogin;
  } 
  return session
 }  ,
},
providers: [],
}



