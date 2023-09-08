
import './App.scss'
import './Animation.scss'
import Bills from './pages/Bills'
import Dashboard from './pages/Dashboard'
import InventoryStock from './pages/InventoryStock'
import Payments from './pages/Payments'
import {  useState } from 'react'
import Signin from './pages/Signin'
import { Route, Routes } from 'react-router-dom'
import AuthProvider from './context/AuthContext'
import PageNotFound from './pages/PageNotFound'
import ProtectedRoute from './ProtectedRoute'
import FetchProvider from './context/FetchContext'
import AddButton from './components/AddButton'
import Customer from './pages/Customer'
import BillShow from './pages/BillShow'

function App() {
  const [displaySidebar,setDisplaySidebar]=useState(false)
  const [createBill,setCreateBill]=useState(false)
  return (
    <>
    <AuthProvider>
      {/* <FetchProvider> */}
      <Routes>
        <Route path='/' element={<ProtectedRoute/>}>
          <Route index element={
            <>
            <FetchProvider>
              <Dashboard displaySidebar={displaySidebar} AddButton={AddButton} setDisplaySidebar={setDisplaySidebar}/>
            </FetchProvider>
            </>
          }/>
          <Route path=':customer' element={
            <>
              <FetchProvider>
                <Customer displaySidebar={displaySidebar} AddButton={AddButton} setDisplaySidebar={setDisplaySidebar}/>
              </FetchProvider>
            </>
          }/>
          <Route path='bills' element={
            <>
            <FetchProvider>
              <Bills createBill={createBill} setCreateBill={setCreateBill} AddButton={AddButton} displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar} />
            </FetchProvider>
            </>
          }/>
          <Route path='bills/:bill' element={
            <>
              <FetchProvider>
                <BillShow AddButton={AddButton} setDisplaySidebar={setDisplaySidebar}/>
              </FetchProvider>
            </>
          }/>
          <Route path='payments' element={
            <>
              <FetchProvider>
                <Payments AddButton={AddButton} displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar} />
              </FetchProvider>
            </>
          } />
          <Route path='inventory' element={
            <>
              <FetchProvider>
                <InventoryStock AddButton={AddButton} displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar} />
              </FetchProvider>
            </>
          } />
        </Route>
        <Route path='/signin' element={<Signin/>} />
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      {/* </FetchProvider> */}
    </AuthProvider>
    </>
  )
}

export default App
