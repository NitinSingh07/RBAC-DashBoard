import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { UsersView } from "./views/UsersView";
import { RolesView } from "./views/RolesView";

function App() {
  return (
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<UsersView />} />
            <Route path="/users" element={<UsersView />} />
            <Route path="/roles" element={<RolesView />} />
          </Routes>
        </Layout>
      </Router>
  );
}

export default App;
