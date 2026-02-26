import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard({ totalUsers, totalCertificates }) {
  const data = {
    labels: ["Users", "Certificates"],
    datasets: [
      {
        label: "System Data",
        data: [totalUsers, totalCertificates],
        backgroundColor: ["#007bff", "#28a745"]
      }
    ]
  };

  return (
    <div>
      <h3>Dashboard Analytics</h3>
      <Bar data={data} />
    </div>
  );
}

export default Dashboard;