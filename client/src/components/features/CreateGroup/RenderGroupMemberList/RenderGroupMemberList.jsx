/**
 * Component to render the list of group members.
 * @param {Array} groupMembers - Array of group members.
 */
const RenderGroupMemberList = ({ groupMembers }) => {
  // Format members for desired display
  const formattedMembers = groupMembers.map(
    (member) => `${member.firstName} ${member.lastName} (${member.username})`
  );

  return (
    <div>
      <h3>Members:</h3>
      {/* Check if there are members*/}
      {formattedMembers.length > 0 ? (
        <ul>
          {/* Map through formatted members and display in a list */}
          {formattedMembers.map((formattedMember, index) => (
            <li key={index}>{formattedMember}</li>
          ))}
        </ul>
      ) : (
        // Display a message if there are no members
        <p>No members yet.</p>
      )}
    </div>
  );
};

export default RenderGroupMemberList;
