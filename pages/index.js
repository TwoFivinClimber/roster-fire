import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div>
      <h3>Hello {user.displayName}! </h3>
      <h1>Welcome To ROSTER FIRE!</h1>
    </div>
  );
}

export default Home;
