import Group from "../../models/Group.js";

/**
 * Socket.IO middleware to check if a user is already a member of a group
 * @param {Object} socket - Socket.IO socket instance
 * @param {function} next - Callback to continue to the next middleware or event handler
 */
export const isUserAlreadyGroupMember = async (socket, next) => {
  // Assuming if groupId and userId are passed in the query parameters
  const { groupId, userId } = socket.handshake.query;

  try {
    // Find the group by ID and check if the user is a member
    const existingGroup = await Group.findOne({
      _id: groupId,
      members: userId,
    });

    if (existingGroup == null) {
      console.log("User is not a member of the group");
      // Handle accordingly
      socket.emit("error", {
        message: "User is not a member of the group",
      });
    } else {
      console.log("User is a member of the group");
      // Continue to the next middleware or event handler
      next();
    }
  } catch (error) {
    console.error("Error in isUserAlreadyMemberMiddleware:", error);
    // Handle the error
    socket.emit("error", { message: "Internal Server Error" });
  }
};
