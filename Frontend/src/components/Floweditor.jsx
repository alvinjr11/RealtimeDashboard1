import React, { useCallback, useEffect, useState } from "react";
import SummaryApi from "../commen/index";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { toast } from "react-toastify";
import { PlusCircleIcon, Save, Trash2 } from "lucide-react";

const userId = "demoUser123"; // Replace with actual userId from auth context

const FlowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  /**
   * Fetches saved flow from backend and initializes nodes and edges
   */
  const fetchFlow = async () => {
    try {
      const res = await fetch(`${SummaryApi.getFlow.url}${userId}`, {
        method: SummaryApi.getFlow.method,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      const flow = data.flow;

      if (flow && flow.elements) {
        // Ensure nodes have required fields
        const safeNodes = (flow.elements.nodes || []).map((n) => ({
          ...n,
          position: n.position || { x: 0, y: 0 },
          type: n.type || "default",
        }));

        // Ensure edges have unique IDs
        const safeEdges = (flow.elements.edges || []).map((e, i) => ({
          ...e,
          id: e.id || `e-${i}-${e.source}-${e.target}`,
        }));

        setNodes(safeNodes);
        setEdges(safeEdges);

        // Fit to view if flow instance is ready
        if (reactFlowInstance) {
          setTimeout(() => reactFlowInstance.fitView(), 100);
        }
      }
    } catch (err) {
      console.error("Failed to fetch flow:", err);
      toast.error("Error fetching flow");
    }
  };

  /**
   * Saves the current nodes and edges to backend
   */
  const saveFlow = async () => {
    try {
      const res = await fetch(SummaryApi.flowSave.url, {
        method: SummaryApi.flowSave.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, elements: { nodes, edges } }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to save");
      toast.success("Flow saved successfully!");
    } catch (err) {
      toast.error("Error saving flow");
    }
  };

  /**
   * Adds a new node at a random position
   */
  const addNode = async () => {
    const newNode = {
      id: `${+new Date()}`,
      type: "default",
      data: { label: "New Node" },
      position: { x: Math.random() * 300, y: Math.random() * 300 },
    };

    try {
      const res = await fetch(SummaryApi.addNode.url, {
        method: SummaryApi.addNode.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, node: newNode }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to add node");

      const data = await res.json();
      setNodes(data.flow.elements.nodes);
      setEdges(data.flow.elements.edges); // Sync edges too
    } catch (err) {
      toast.error("Error adding node");
    }
  };

  /**
   * Deletes selected node and connected edges
   */
  const deleteSelected = async () => {
    const selectedNode = nodes.find((n) => n.selected);
    if (!selectedNode) {
      toast.info("No node selected");
      return;
    }

    try {
      const res = await fetch(SummaryApi.deleteNode.url, {
        method: SummaryApi.deleteNode.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, nodeId: selectedNode.id }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete");

      const data = await res.json();
      setNodes(data.flow.elements.nodes);
      setEdges(data.flow.elements.edges);
    } catch (err) {
      toast.error("Error deleting node");
    }
  };

  /**
   * Connects nodes by creating new edges
   */
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge({ ...connection, id: `${+new Date()}` }, eds)),
    [setEdges]
  );

  /**
   * Handle node drag (position change)
   */
  const onNodeDragStop = async (event, node) => {
    const updatedNode = {
      ...node,
      position: node.position, // New position after drag
    };

    try {
      const res = await fetch(SummaryApi.updateNodePosition.url, {
        method: SummaryApi.updateNodePosition.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, node: updatedNode }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update node position");

      const data = await res.json();
      setNodes(data.flow.elements.nodes);
      setEdges(data.flow.elements.edges); // Sync edges too
    } catch (err) {
      toast.error("Error updating node position");
    }
  };

  useEffect(() => {
    fetchFlow();
  }, []);

  return (
    <div className="h-[90vh] w-full flex flex-col bg-gradient-to-r from-gray-200 to-gray-300">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-6 py-8 shadow-md bg-gradient-to-l from-gray-200 to-gray-300 border-b">
        <h1 className="text-2xl font-bold text-gray-600 tracking-wide drop-shadow-sm">
          Flow Editor
        </h1>
        <div className="flex items-center space-x-4">
          {/* Add Node Button */}
          <button
            onClick={addNode}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <PlusCircleIcon size={18} />
            Add Node
          </button>

          {/* Save Flow Button */}
          <button
            onClick={saveFlow}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <Save size={18} />
            Save Flow
          </button>

          {/* Delete Selected Button */}
          <button
            onClick={deleteSelected}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <Trash2 size={18} />
            Delete Selected
          </button>
        </div>
      </div>

      {/* React Flow Canvas */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDragStop={onNodeDragStop} // Add this to handle drag stop
          onInit={setReactFlowInstance}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};

// Export wrapped in ReactFlowProvider
export default () => (
  <ReactFlowProvider>
    <FlowEditor />
  </ReactFlowProvider>
);
