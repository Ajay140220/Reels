import '../styles/globals.css';
import "./signup/signup.css";
import "./login/Login.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../components/Feed.css';
import AuthWrapper from '../context/auth';
import '../components/profile.css';
export default function App({ Component, pageProps }) {
  return(
  <AuthWrapper>
    <Component {...pageProps} />
  </AuthWrapper>
  );
}
