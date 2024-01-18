import { useState,useCallback, useEffect, useRef } from 'react'
import './index.css';
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed]= useState('False');
  const [charAllowed, setCharAllowed]= useState('False');
  const [password, setNewPassword]=useState('');

  const passwordGenerator =useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed)
    str+="0123456789";
    if(charAllowed)
    str+="!@#$%^&*";
    
    for(let i=1; i<=length; i++){
      let char=Math.floor(Math.random()*str.length +1)
      pass+=str.charAt(char);
    }
   setNewPassword(pass);

  },[length,numberAllowed,charAllowed,setNewPassword])

  let passwordRef=useRef(null);
  
  const copyPwd=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    passwordGenerator();

  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-200'>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
        <h1 className='text-center text-black'>Password generator</h1>
        <input type='text' value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef}/>
        <button className='outline-none bg-blue-600 px-3 py-5 shrink-0 text-white 'onClick={copyPwd}> Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>setLength(e.target.value)}/>
          <label>Length :{length}</label> 
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={numberAllowed} id='numbersID' onChange={()=>{setNumberAllowed((prev)=>!prev)}}/>
          <label htmlFor='numbersID'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={charAllowed} id='charID' onChange={()=>{setCharAllowed((prev)=>!prev)}}/>
          <label htmlFor='charID'>Characters</label>
        </div>
      

      </div>
    </div>
    </>
  )
}

export default App
