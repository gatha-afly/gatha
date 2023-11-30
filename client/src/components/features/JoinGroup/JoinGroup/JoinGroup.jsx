/* eslint-disable react/no-unescaped-entities */
import PiratePxPageRender from "../../../common/PiratePxPageRender/PiratePxPageRender";
import ReactIconNavigate from "../../../common/ReactIconNavigate/ReactIconNavigate";
import SearchGroupAndJoin from "../SearchGroupAndJoin/SearchGroupAndJoin";
import styles from "./JoinGroup.module.css";
import { HiMiniBackspace } from "react-icons/hi2";

const JoinGroup = ({ onDefaultViewClick }) => {
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

export default JoinGroup;
