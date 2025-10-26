"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend
);

import { Bar, Doughnut, Line } from "react-chartjs-2";
import ApplicationData from "@/data/ApplicationData.json";
import VisaData from "@/data/ApplicationData.json";
import MonthlyData from "@/data/MonthlyData.json";

const Graph = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <div className="rounded-md shadow-lg p-6">
          <h2>Visa Applications</h2>
          <p className="mb-4">Current status of all visa application.</p>
          <Doughnut
            data={{
              labels: ApplicationData.map((data) => data.label),
              datasets: [
                {
                  label: "Application Status",
                  data: ApplicationData.map((data) => data.value),
                  backgroundColor: [
                    "rgba(67, 174, 72, 1)",
                    "rgba(80, 115, 255, 1)",
                    "rgb(255, 99, 132)",
                  ],
                },
              ],
            }}
          />
        </div>
        <div className="rounded-md shadow-lg p-6">
          <h2>Visa Applications</h2>
          <p className="mb-4">Current status of all visa application.</p>
          <Bar
            data={{
              labels: VisaData.map((data) => data.label),
              datasets: [
                {
                  label: "Visa Applications",
                  data: VisaData.map((data) => data.value),
                  backgroundColor: "rgba(65, 65, 65, 1)",
                },
              ],
            }}
          />
        </div>
        <div className="rounded-md shadow-lg p-6">
          <h2>Visa Applications</h2>
          <p className="mb-4">Current status of all visa application.</p>
          <Line
            data={{
              labels: MonthlyData.map((data) => data.label),
              datasets: [
                {
                  label: "Monthly Applications",
                  data: MonthlyData.map((data) => data.value),
                  backgroundColor: "green",
                  borderColor: "#29935C",
                  borderCapStyle: "round",
                },
              ],
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Graph;
