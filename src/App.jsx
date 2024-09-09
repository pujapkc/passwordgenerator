import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length,setlength]  = useState(8)
  const [numberAllowed,setnumberAllowed] = useState(false)
  const [charAllowed,setcharAllowed] = useState(false)
  const [Password,setPassword]  = useState('')

  const passwordref  = useRef(null)

  const generatePassword = useCallback(()=>{
      let pass = ""
      let str  = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
       if (numberAllowed) str+="0123456789"
       if (charAllowed) str+="!@#$%^&*()"

       for(let i =1;i<length;i++){
        const char = Math.floor(Math.random()*str.length+1)
        pass+=str.charAt(char)

       }
       setPassword(pass);
  },[length,numberAllowed,charAllowed])

  useEffect(()=>{
      generatePassword()
  },[length,numberAllowed,charAllowed])

  const copypasswordtoclipboard =()=>{
    window.navigator.clipboard.writeText(Password);
    passwordref.current?.select()
  }


  return (
    <>
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
          <h1 className='text-3xl font-bold mb-2 text-center'>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input type="text" 
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            value={Password}
            ref={passwordref}
            readOnly
             />
             <button 
             className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copypasswordtoclipboard}>
             Copy
             </button>
             </div>
             <div className='flex items-center gap-x-1'>
              <input type="range" 
              min = {6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setlength(e.target.value)}
              />
              <label htmlFor="length">Length : {length}</label>
          
          <div className='flex items-center gap-x-1'>
              <input type="checkbox" 
              defaultChecked = {numberAllowed}
              onChange={()=>{
                setnumberAllowed ((prev)=>!prev)
              }}
              name=""
               id="" />
               <label htmlFor="numbers">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input type="checkbox" 
              defaultChecked = {charAllowed}
              onChange={()=>{
                setcharAllowed ((prev)=>!prev)
              }}
              name=""
               id="" />
               <label htmlFor="numbers">Characters</label>
          </div>
        </div>
        </div>    
    </>
  )
}

export default App
