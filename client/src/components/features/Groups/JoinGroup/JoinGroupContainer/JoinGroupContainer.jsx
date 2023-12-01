import SearchGroupAndJoin from "../SearchGroupAndJoin/SearchGroupAndJoin";
import styles from "./JoinGroupContainer.module.css";
import { HiMiniBackspace } from "react-icons/hi2";
import PiratePxPageRender from "../../../../common/PiratePxPageRender/PiratePxPageRender";
import ReactIconNavigate from "../../../../common/ReactIconNavigate/ReactIconNavigate";

/**
 * JoinGroupContainer Component
 *
 * Container for joining an existing group, including a search component for finding and joining a group using the code.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onDefaultViewClick - Callback function to switch to the default view.
 * @returns {JSX.Element} The rendered JoinGroupContainer component.
 */

const JoinGroupContainer = ({ onDefaultViewClick }) => {
  return (
    <section className={styles.joinGroupContainer}>
      <PiratePxPageRender COUNT_IDENTIFIER={"join-group"} />
      <h1>Join a group</h1>
      <p className={styles.explanation}>
        If you've been shared a code to join a group, simply enter it here:
      </p>
      <SearchGroupAndJoin onDefaultViewClick={onDefaultViewClick} />
      <ReactIconNavigate
        onClick={onDefaultViewClick}
        size={3}
        icon={HiMiniBackspace}
      />
    </section>
  );
};

export default JoinGroupContainer;
