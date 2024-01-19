import React,{useState} from 'react'
import './Signup.css'
import { UserSignup } from '../../api/userApi'
import { useNavigate } from 'react-router-dom'
// UserSign
// userSignup



function Signup() {
    const navigate = useNavigate()
    const [userName,setUserName] = useState('')
    const [fullName,setFullName] = useState('')
    const [email,setEmail] = useState('')
    const [mobile,setMobile] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const [validationErr,setValidationErr] = useState('')
    const[loading,setLoading] = useState(false)



    const validateForm = () => {
        // Validation for each field
        if (userName.length < 3) {
          setValidationErr('Username must be at least 3 characters')
          return false;
        }
      
        if (fullName.length < 3) {
          setValidationErr('Full Name must be at least 3 characters')
          return false;
        }
      
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setValidationErr('Invalid email address')
          return false;
        }
      
        if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
          setValidationErr('Mobile number must be 10 digits')
          return false;
        }
      
        if (password.length < 3) {
          setValidationErr('Password must be at least 3 characters')
          return false;
        }
      
        if (password !== confirmPassword) {
          setValidationErr('Passwords do not match')
          return false;
        }
        setValidationErr("")
        setLoading(true)
        return true;
      };
    // userName, fullName, email, mobile, password
    const submitHandler = async(e)=>{
        e.preventDefault()
        if (!validateForm()) {
            return;
          }
        UserSignup({userName,fullName,email,mobile,password}).then((res)=>{
            // console.log(res);
            if(!res.success){
                console.log("Request Failed..");
                setLoading(false)
                return
            }
            navigate('/login')

        })
    }
    return (
        <>
            <div className="limiter col-12">
   <div className="container-login100 col-12">
      <div className="wrap-signup pb-5 col-5">
         <form onSubmit={(e)=>submitHandler(e)}>
            <span className="login100-form-title p-b-26 mb-4">Join Now</span>
            <span className="login100-form-title p-b-48">
            <i className="zmdi zmdi-font" />
            </span>
            <div className='d-flex justify-content-around'>
               <div className="wrap-input100 mx-1">
                  <input
                    value={userName} onChange={(e)=>setUserName(e.target.value)}
                     className="input100"
                     placeholder="User Name"
                     type="text"
                     />
               </div>
               <div className="wrap-input100 mx-1">
                  <input
                  value={fullName} onChange={(e)=>setFullName(e.target.value)}
                     className="input100"
                     placeholder="Full Name"
                     type="text"
                     />
               </div>
            </div>
            <div className='d-flex justify-content-around'>
               <div className="wrap-input100 mx-1">
                  <input
                  value={email} onChange={(e)=>setEmail(e.target.value)}
                     className="input100"
                     placeholder="Email"
                     type="email"
                     name="email"
                     />
               </div>
               <div className="wrap-input100 mx-1">
                  <input
                  value={mobile} onChange={(e)=>setMobile(e.target.value)}
                     className="input100"
                     placeholder="Mobile"
                     type="number"
                     />
               </div>
            </div>
            <div className='d-flex justify-content-around'>
               <div className="wrap-input100 mx-1">
                  <input
                  value={password} onChange={(e)=>setPassword(e.target.value)}
                     className="input100"
                     placeholder="password"
                     type="password"
                     />
               </div>
               <div className="wrap-input100 mx-1">
                  <input
                  value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}
                     className="input100"
                     placeholder="Confirm Password"
                     type="password"
                     />
               </div>
            </div>
            <p className='text-danger text-center'>{validationErr}</p>
            <div className="log-bt-area text-center">
               <button type='submit' className="login-bt ">{loading ? <div className='spinner m-auto '></div> : "Get Started"} </button>
            </div>
         </form>
         <p id="username-error" />
         <h1 className=" text-center fs-6">
            <a className="text-dark" onClick={()=>navigate('/login')} style={{cursor:'pointer'}}>
            Already have an account
            </a>
         </h1>
      </div>
   </div>
</div>

        </>
    )
}

export default Signup