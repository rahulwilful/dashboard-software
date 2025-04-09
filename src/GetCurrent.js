
import axiosClient from "./axiosClient";
/* import { useNavigate } from "react-router-dom"
const navigate = useNavigate() */

export async function   GetCurrent (data,navigate )  {
  if(!data){
   // console.log("data: ", )
  }else{

   // console.log("data: ",data)
  }
    try{
      let res = await axiosClient.post(`/user/get/current`)
      const user = res.data.user
      //console.log('res.data.result: ', user)
      if(!res){
        //window.location.href = '/login'
        navigate("/login")
        return false
      }
      if(data){
        if(data == 'super_admin' && user.roleType != 'super_admin'){
          //window.location.href = '/'
          navigate("/")
          return false
         
        }
        if(data == 'limits' &&  user.limits == false && user.roleType != 'super_admin'){
          //window.location.href = '/'
          navigate("/")
          return false
         
        }
        if(data == 'analysis' &&  user.analysis == false && user.roleType != 'super_admin'){
          //window.location.href = '/'
          navigate("/")
          return false
         
        }
        if(data == 'settings' &&  user.settings == false && user.roleType != 'super_admin'){
          //window.location.href = '/'
          navigate("/")
          return false
         
        }
        if(data == 'users' &&  user.users == false && user.roleType != 'super_admin'){
          //window.location.href = '/'
          navigate("/")
          return false
         
        }
        
      }
      return res.data.user
    }catch(err){
      console.log("error: ",err)
      //window.location.href = '/login'
      navigate("/login")
        return false
    }
   
}
