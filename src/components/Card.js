import React from "react";

const Card = ({ thumbnail, userName, email, gender, id, deleteUser }) => {
  return (
    <>
      <div className="card m-1" style={{ width: "18rem" }}>
        <img src={thumbnail} className="card-img-top" alt="..." />
        <div className="card-body">
          <h3>Name:{userName}</h3>
          <h3>Email:{email}</h3>
          <h3>Gender:{gender}</h3>
        </div>
        <button
          onClick={() => deleteUser(id)}
          type="button"
          class=" mb-2 ms-auto btn btn-primary"
        >
          Remove
        </button>
      </div>
    </>
  );
};

export default Card;
