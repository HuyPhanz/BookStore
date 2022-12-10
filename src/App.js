import { ToastContainer } from 'react-toastify';
import {BrowserRouter} from "react-router-dom";
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
import 'react-toastify/dist/ReactToastify.css';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import {AuthProvider} from "./hooks/useRoute";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthProvider>
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
        <Router />
      <ToastContainer />
    </ThemeProvider>
    </AuthProvider>
  );
}
