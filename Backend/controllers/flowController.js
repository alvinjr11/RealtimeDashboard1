const Flow = require("../models/FlowModel");

/**
 * Save or update flow data for a specific user.
 * If flow exists, it updates; otherwise, it creates a new entry.
 */
exports.saveFlow = async (req, res) => {
  const { userId, elements } = req.body;

  try {
    let flow = await Flow.findOne({ userId });

    if (flow) {
      flow.elements = elements;
      await flow.save();
    } else {
      flow = new Flow({ userId, elements });
      await flow.save();
    }

    res.status(200).json({ success: true, message: "Flow saved successfully", flow });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

/**
 * Get flow data for a user based on userId param
 */
exports.getFlow = async (req, res) => {
  try {
    const flow = await Flow.findOne({ userId: req.params.userId });

    if (!flow) {
      return res.status(404).json({ success: false, message: "Flow not found" });
    }

    res.status(200).json({ success: true, flow });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

/**
 * Add a new node to the user's flow
 */
exports.addNode = async (req, res) => {
  const { userId, node } = req.body;

  try {
    const flow = await Flow.findOne({ userId });

    if (!flow) {
      return res.status(404).json({ success: false, message: "Flow not found" });
    }

    // Add node
    const elements = flow.elements || { nodes: [], edges: [] };
    elements.nodes.push(node);
    flow.elements = elements;

    await flow.save();
    res.status(200).json({ success: true, message: "Node added", flow });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add node", error });
  }
};

/**
 * Delete a node and its connected edges from the user's flow
 */
exports.deleteNode = async (req, res) => {
  const { userId, nodeId } = req.body;

  try {
    const flow = await Flow.findOne({ userId });

    if (!flow) {
      return res.status(404).json({ success: false, message: "Flow not found" });
    }

    let elements = flow.elements || { nodes: [], edges: [] };

    // Remove the node
    elements.nodes = elements.nodes.filter((node) => node.id !== nodeId);

    // Remove edges connected to the node
    elements.edges = elements.edges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    );

    flow.elements = elements;
    await flow.save();

    res.status(200).json({ success: true, message: "Node deleted", flow });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete node", error });
  }
};
