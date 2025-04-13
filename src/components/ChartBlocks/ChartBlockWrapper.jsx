import { useEffect, useRef, useState } from "react";
import LineChartBlock from "./LineChartBlock";
import BarChartBlock from "./BarChartBlock";
import PieChartBlock from "./PieChartBlock";

export default function ChartBlockWrapper({ id, chartType, onDelete }) {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 300, height: 250 });

  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        setSize({
          width: containerRef.current.offsetWidth - 40,
          height: containerRef.current.offsetHeight - 100,
        });
      }
    }

    updateSize();
    const observer = new ResizeObserver(updateSize);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return <LineChartBlock {...size} />;
      case "bar":
        return <BarChartBlock {...size} />;
      case "pie":
        return <PieChartBlock {...size} />;
      default:
        return <p>Unknown Chart</p>;
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        background: "#111",
        padding: 10,
        borderRadius: 10,
        color: "white",
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        className="drag-handle d-flex justify-content-between align-items-center"
        style={{
          background: "#222",
          padding: "10px",
          fontWeight: "bold",
          cursor: "move",
          borderRadius: "8px 8px 0 0",
          color: "white",
          marginBottom: 10,
        }}
      >
        {chartType.toUpperCase()} Chart
        <button
          className="btn btn-sm btn-danger ms-2"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            onDelete();
          }}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
      {renderChart()}
    </div>
  );
}
