"use client";

import {
  useAuth
} from "@/context/AuthContext";

export default function TestAuth() {

  const {
    user,
    login,
    logout
  } = useAuth();

  return (
    <div className="p-10">

      {!user ? (
        <button
          onClick={login}
        >
          Login
        </button>
      ) : (
        <>
          <img
            src={
              user.photoURL ||
              ""
            }
            width={80}
          />

          <h2>
            {
              user.displayName
            }
          </h2>

          <p>
            {
              user.email
            }
          </p>

          <button
            onClick={
              logout
            }
          >
            Logout
          </button>
        </>
      )}

    </div>
  );
}