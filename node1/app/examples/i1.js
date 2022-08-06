// **Find calc's hWnd, need running a calculator program manually at first**

/**
 * exposed modules:
 * C, Comctl32 for Comctl32 from lib/comctl32/api
 * K, Kernel32 for kernel32 from lib/kernel32/api
 * U, User32 for user32 from lib/user32/api
 */
 import { K, U } from 'win32-api'
 import * as ref from 'ref-napi' 

 const knl32 = K.load()
 const user32 = U.load()  // load all apis defined in lib/{dll}/api from user32.dll
 // const user32 = U.load(['FindWindowExW'])  // load only one api defined in lib/{dll}/api from user32.dll
 
 const title = 'Calculator\0'    // null-terminated string
 // const title = '计算器\0'    // null-terminated string 字符串必须以\0即null结尾!
 
 const lpszWindow = Buffer.from(title, 'ucs2')
 const hWnd = user32.FindWindowExW(0, 0, null, lpszWindow)
 
 if (typeof hWnd === 'number' && hWnd > 0
   || typeof hWnd === 'bigint' && hWnd > 0
   || typeof hWnd === 'string' && hWnd.length > 0
 ) {
   console.log('buf: ', hWnd)
 
   // Change title of the Calculator
   const res = user32.SetWindowTextW(hWnd, Buffer.from('Node-Calculator\0', 'ucs2'))
 
   if ( ! res) {
     console.log('SetWindowTextW failed')
   }
   else {
     console.log('window title changed')
   }
 }