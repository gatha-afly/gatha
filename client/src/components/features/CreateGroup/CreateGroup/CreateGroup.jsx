import styles from "./CreateGroup.module.css";
import CreateGroupForm from "../CreateGroupForm/CreateGroupForm";
import { HiMiniBackspace } from "react-icons/hi2";
import PiratePxPageRender from "../../../common/PiratePxPageRender/PiratePxPageRender";
import ReactIconNavigate from "../../../common/ReactIconNavigate/ReactIconNavigate";

const CreateGroup = ({ onDefaultViewClick }) => {
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

export default CreateGroup;
