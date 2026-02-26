import React from "react";

function Certificates({ certificates, deleteCertificate }) {
  return (
    <div>
      <h3>Manage Certificates</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Domain</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((c) => (
            <tr key={c._id}>
              <td>{c.certificateId}</td>
              <td>{c.studentName}</td>
              <td>{c.internshipDomain}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteCertificate(c._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Certificates;