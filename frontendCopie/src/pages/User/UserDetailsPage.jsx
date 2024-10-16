import Account from "../../components/Account/Account";
import Data from "../../data/Data.json";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { EditUser } from "../../store/Actions/UserAction";

function UserDetails() {
  const selectUser = (state) => state.user.user.body;
  const user = useSelector(selectUser); //utilisation de useSelector pour extraire les données de l'utilisateur du store
  const [userName, setUserName] = useState(user ? user.userName : "");
  const navigate = useNavigate();
  const [editName, setEditName] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //empêche le rechargement de la page HTML
    dispatch(EditUser(userName)); //envoie de l'action EditUser au store
    setEditName(false);
  };

  const handleCancel = () => {
    setEditName(false);
    setUserName(user ? user.userName : "");
  };

  if (!user) {
    return null;
  }

  return (
    <main className="main bg-dark main-user">
      <div className="header">
        {/* <h1>
          Welcome back
          <br />
          {user.firstName} {user.lastName}
        </h1> */}
        {editName ? (
          <form className="edit-wrapper" onSubmit={handleSubmit}>
            <p className="edit-title-texte-user-new">Edit user info</p>
            <div className="edit-form-inputs">
              <label htmlFor="input-label">Username:</label>
              <input
                type="text"
                label="User Name :"
                value={userName}
                onChange={handleUserNameChange}
              />
              <label htmlFor="input-label">First name:</label>{" "}
              <input
                type="text"
                label="First Name :"
                value={user.firstName}
                disabled
              />
              <label htmlFor="input-label">Last Name:</label>{" "}
              <input
                type="text"
                label="Last Name :"
                value={user.lastName}
                disabled
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="edit-button">
                Save
              </button>
              <button
                type="button"
                className="edit-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button className="edit-button" onClick={() => setEditName(true)}>
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      {Data.map((account, index) => (
        <Account
          key={`account-${index}`}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
    </main>
  );
}

export default UserDetails;
