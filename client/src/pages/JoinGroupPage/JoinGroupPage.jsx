import styles from "./JoinGroupPage.module.css";
import PiratePxPageRender from "../../components/reusableComponents/PiratePxPageRender/PiratePxPageRender";

const JoinGroupPage = () => {
  return (
    <main className={styles.container}>
      <PiratePxPageRender COUNT_IDENTIFIER={"join-group"} />
      <h1>Join a group</h1>
    </main>
  );
};

export default JoinGroupPage;
