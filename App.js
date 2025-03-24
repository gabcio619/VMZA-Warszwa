import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";

const employees = [
  { id: 1, name: "Jan Kowalski", schedule: "8:00 - 16:00", contact: "jan.kowalski@vmza.pl" },
  { id: 2, name: "Anna Nowak", schedule: "10:00 - 18:00", contact: "anna.nowak@vmza.pl" }
];

const Home = () => (
  <div className="p-6 text-center">
    <img src="/solaris-logo.png" alt="Solaris Logo" className="mx-auto w-32" />
    <h1 className="text-2xl font-bold">VMZA Warszawa - Panel Pracowniczy</h1>
    <p className="mt-2">Zaloguj się, aby uzyskać dostęp do grafików i danych kontaktowych.</p>
    <Button className="mt-4" asChild>
      <Link to="/login">Zaloguj się</Link>
    </Button>
  </div>
);

const Login = ({ setAuthenticated }) => {
  const handleLogin = () => {
    setAuthenticated(true);
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold">Logowanie</h2>
      <Input className="mt-4" placeholder="Email" />
      <Input className="mt-2" type="password" placeholder="Hasło" />
      <Button className="mt-4" onClick={handleLogin}>Zaloguj</Button>
    </div>
  );
};

const Dashboard = ({ authenticated }) => {
  if (!authenticated) return <Navigate to="/login" />;
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Aktualne Grafiki</h2>
      <Table className="mt-4">
        <thead>
          <tr>
            <th>Imię i nazwisko</th>
            <th>Godziny pracy</th>
            <th>Kontakt</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.schedule}</td>
              <td>{emp.contact}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const AdminPanel = ({ authenticated }) => {
  if (!authenticated) return <Navigate to="/login" />;
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Panel Administracyjny</h2>
      <p>Zarządzaj pracownikami i grafikami.</p>
      <Button className="mt-4">Dodaj pracownika</Button>
      <Button className="mt-4 ml-2">Edytuj grafik</Button>
    </div>
  );
};

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
        <Route path="/dashboard" element={<Dashboard authenticated={authenticated} />} />
        <Route path="/admin" element={<AdminPanel authenticated={authenticated} />} />
      </Routes>
    </Router>
  );
};

export default App;
