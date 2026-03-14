import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Advisor from './pages/Advisor';
import Learn from './pages/Learn';
import Safety from './pages/Safety';

import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null); // null means not logged in
  const [toastMsg, setToastMsg]   = useState("");
  const [toastShow, setToastShow] = useState(false);

  const toast = (msg) => {
    setToastMsg(msg);
    setToastShow(true);
    setTimeout(() => setToastShow(false), 3200);
  };

  return (
    <div className="min-h-screen bg-rose-50/30">
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/jobs"    element={<Jobs user={user} toast={toast} />} />
        <Route path="/advisor" element={<Advisor />} />
        <Route path="/learn"   element={<Learn toast={toast} />} />
        <Route path="/safety"  element={<Safety toast={toast} />} />
        <Route path="/login"   element={<Login setAuth={setUser} toast={toast} />} />
      </Routes>
      <Toast msg={toastMsg} show={toastShow} />
    </div>
  );
}

export default App;
