import { HiMiniBackspace } from "react-icons/hi2";
import styles from "./CreateGroupContainer.module.css";
import CreateGroupForm from "../CreateGroupForm/CreateGroupForm";
import PiratePxPageRender from "@common/PiratePxPageRender/PiratePxPageRender";
import ReactIconNavigate from "@common/ReactIconNavigate/ReactIconNavigate";

/**
 * Container for creating a new group: It includes the form for creating the group and navigation back to the default view.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onDefaultViewClick - Callback function to switch to the default view.
 * @returns {JSX.Element} The rendered CreateGroupContainer component.
 */
const CreateGroupContainer = ({ onDefaultViewClick }) => {
  return (
    <section className={styles.createGroupContainer}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"create-group"} />
      <h1>Create group</h1>
      <CreateGroupForm onDefaultViewClick={onDefaultViewClick} />
      <ReactIconNavigate
        onClick={onDefaultViewClick}
        size={3}
        icon={HiMiniBackspace}
      />
    </section>
  );
};

export default CreateGroupContainer;
