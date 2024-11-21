import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { UsersView } from "./views/UsersView";
import { RolesView } from "./views/RolesView";
import { NotificationProvider } from "./context/NotificationContext";

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<UsersView />} />
            <Route path="/users" element={<UsersView />} />
            <Route path="/roles" element={<RolesView />} />
          </Routes>
        </Layout>
      </Router>
    </NotificationProvider>
  );
}

export default App;
