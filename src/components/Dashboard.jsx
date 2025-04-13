import { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import ChartBlockWrapper from "./ChartBlocks/ChartBlockWrapper";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function DashboardLayout() {
  const [charts, setCharts] = useState([]);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const userId = user?.id;

  useEffect(() => {
    async function loadCharts() {
      if (!userId) return;

      const res = await fetch(`https://json-server-theta-ebon.vercel.app/users/${userId}`);
      const userData = await res.json();
      setCharts(userData.charts || []);
      setUser(userData); 
    }

    loadCharts();
  }, [userId]);

  const addChart = async (type) => {
    const newId = Date.now().toString();
    const newChart = {
      id: newId,
      type,
      x: 0,
      y: Infinity,
      w: 6,
      h: 4,
    };

    const updated = [...charts, newChart];
    setCharts(updated);

    await fetch(`https://json-server-theta-ebon.vercel.app/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ charts: updated }),
    });

    const updatedUser = { ...user, charts: updated };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const saveLayout = async (layout) => {
    const updatedCharts = charts.map((chart) => {
      const item = layout.find((l) => l.i === chart.id);
      return item ? { ...chart, ...item } : chart;
    });

    setCharts(updatedCharts);

    await fetch(`https://json-server-theta-ebon.vercel.app/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ charts: updatedCharts }),
    });

    const updatedUser = { ...user, charts: updatedCharts };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/"; 
  };
  const deleteChart = async (id) => {
    const updated = charts.filter((chart) => chart.id !== id);
    setCharts(updated);
  
    await fetch(`https://json-server-theta-ebon.vercel.app/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ charts: updated }),
    });
  
    const updatedUser = { ...user, charts: updated };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };
  
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center p-3 bg-dark text-white mb-3 rounded">
        <div>
          {user ? (
            <h4 className="mb-0">
              Welcome, {user.name} {user.surname}
            </h4>
          ) : (
            <h4 className="mb-0">Dashboard</h4>
          )}
        </div>
        <button className="btn btn-outline-light" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="mb-3 d-flex gap-2">
        <button className="btn btn-primary" onClick={() => addChart("line")}>
          Add Line Chart
        </button>
        <button className="btn btn-success" onClick={() => addChart("bar")}>
          Add Bar Chart
        </button>
        <button className="btn btn-warning text-white" onClick={() => addChart("pie")}>
          Add Pie Chart
        </button>
      </div>

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: charts.map((chart) => ({ ...chart, i: chart.id })) }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4 }}
        rowHeight={100}
        isDraggable
        isResizable
        draggableHandle=".drag-handle"
        style={{ width: "100%" }}
        onLayoutChange={(layout) => saveLayout(layout)}
      >
        {charts.map((chart) => (
          <div key={chart.id} data-grid={{ ...chart }}>
            <ChartBlockWrapper id={chart.id} chartType={chart.type}   onDelete={() => deleteChart(chart.id)}
 />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
