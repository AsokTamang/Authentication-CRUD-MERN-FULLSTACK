
import { useAppStore } from "../store/appStore";

import { NavLink,useNavigate} from "react-router-dom";
import Navbar from "../navbar/navlink";
export default function Home() {
    const navigate=useNavigate();
  const { signOut } = useAppStore();
  const handlesubmit = async () => {
    try {
      await signOut();    //here we are awaiting the signout funtion
      navigate('/');
    } catch (Err) {
      console.error(Err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="admin">
        <h1 className="heading">Admin Dashboard</h1>
        <hr></hr>
        <main className="crud">
          <NavLink className="nav" to="/get">
            Get Staff info.
          </NavLink>
          <NavLink className="nav" to="/create">
            Create Staff info.
          </NavLink>
          <NavLink className="nav" to="/update">
            Update Staff info.
          </NavLink>
          <NavLink className="nav" to="/delete">
            Delete Staff info.
          </NavLink>

          <button onClick={handlesubmit} className="logout" >
            Logout
          </button>
        </main>
      </div>
    </>
  );
}
