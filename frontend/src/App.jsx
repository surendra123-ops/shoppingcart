import './App.css';
import { Navbar } from './components/Navbar.jsx';
import { AppRoutes } from './routes/AppRoutes.jsx';

const App = () => (
  <div className="app-shell">
    <Navbar />
    <main className="flex-1">
      <AppRoutes />
    </main>
    <footer className="border-t border-neutral-200 bg-white/80 backdrop-blur-sm py-8 text-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
       <p>vibecart</p>
      </div>
    </footer>
  </div>
);

export default App;
