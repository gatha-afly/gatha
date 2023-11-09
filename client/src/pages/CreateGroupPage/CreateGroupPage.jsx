import styles from "./CreateGroupPage.module.css";
import PiratePxPageRender from "../../components/reusableComponents/PiratePxPageRender/PiratePxPageRender";

const CreateGroupPage = () => {
  return (
    <main className={styles.container}>
      <PiratePxPageRender COUNT_IDENTIFIER={"create-group"} />
      <h1>Create group</h1>
    </main>
  );
};

export default CreateGroupPage;
