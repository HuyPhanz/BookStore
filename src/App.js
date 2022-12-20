import { ToastContainer } from 'react-toastify';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
import 'react-toastify/dist/ReactToastify.css';
// components
import {AuthProvider} from "./hooks/useRoute";


// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router />
        <ToastContainer />
      </ThemeProvider>
    </AuthProvider>
  );
}
