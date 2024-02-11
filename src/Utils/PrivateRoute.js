import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const PrivateRoute = ({ element }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
  
        setLoading(false);
      });
  
      return () => unsubscribe();
    }, []);
  
    if (loading) {
      return <div className='spinner mt-5'></div>;
    }
  
    return authenticated ? element : <Navigate to="/" />;
  };

export default PrivateRoute;