import { createContext } from "react";

/**
 * UserContext - React context for managing user-related information.
 *
 * @type {React.Context}
 * @property {Object} Provider - The provider component to wrap the application with.
 * @property {Object} Consumer - The consumer component to access the context in class components.
 */
const UserContext = createContext();

export default UserContext;
