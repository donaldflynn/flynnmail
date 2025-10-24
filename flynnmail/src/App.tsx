import './App.css'
import EmailPage from './EmailPage'
import SearchPage from './Searchpage'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/inbox/:inbox" element={<EmailPage />} />
    </Routes>
  )
}

export default App


  // <>
    //   <div>
    //     <a href='https://vite.dev' target='_blank'>
    //       <img src={viteLogo} className='logo' alt='Vite logo' />
    //     </a>
    //     <a href='https://react.dev' target='_blank'>
    //       <img src={reactLogo} className='logo react' alt='React logo' />
    //     </a>
    //     <a href='https://workers.cloudflare.com/' target='_blank'>
    //       <img src={cloudflareLogo} className='logo cloudflare' alt='Cloudflare logo' />
    //     </a>
    //   </div>
    //   <h1>Vite + React + Cloudflare</h1>
    //   <div className='card'>
    //     <button
    //       onClick={() => setCount((count) => count + 1)}
    //       aria-label='increment'
    //     >
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <div className='card'>
    //     <button
    //       onClick={() => {
    //         fetch('/api/')
    //           .then((res) => res.json() as Promise<{ name: string }>)
    //           .then((data) => setName(data.name))
    //       }}
    //       aria-label='get name'
    //     >
    //       Name from API is: {name}
    //     </button>
    //     <p>
    //       Edit <code>worker/index.ts</code> to change the name
    //     </p>
    //   </div>
    //   <p className='read-the-docs'>
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>