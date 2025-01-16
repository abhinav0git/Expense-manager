import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Auth } from "./pages/auth/index.jsx"
import { ExpenseTracker } from "./pages/expense-tracker/index.jsx"
import { useGetUserInfo } from "./hooks/useGetUserInfo"

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useGetUserInfo();
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }  
  return children;
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense-tracker" element=
          {
           <ProtectedRoute>
            <ExpenseTracker />
           </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;