import React, { useState } from "react";

const playersData = [
  { id: 1, name: "Virat Kohli", role: "Batsman" },
  { id: 2, name: "Rashid Khan", role: "Bowler" },
  { id: 3, name: "MS Dhoni", role: "Wicketkeeper" },
  { id: 4, name: "Hardik Pandya", role: "All-Rounder" },
  { id: 5, name: "Jasprit Bumrah", role: "Bowler" },
];

function PlayersList() {
  const [searchRole, setSearchRole] = useState("");

  const filteredPlayers = playersData.filter((player) =>
    player.role.toLowerCase().includes(searchRole.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Players List</h2>
      <input
        type="text"
        placeholder="Search by role..."
        value={searchRole}
        onChange={(e) => setSearchRole(e.target.value)}
        style={{ padding: "8px", width: "250px", marginBottom: "15px" }}
      />
      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player) => (
              <tr key={player.id}>
                <td>{player.id}</td>
                <td>{player.name}</td>
                <td>{player.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No players found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PlayersList;
