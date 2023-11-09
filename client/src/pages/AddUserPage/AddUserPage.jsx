import styles from "./AddUserPage.module.css";
import PiratePxPageRender from "../../components/reusableComponents/PiratePxPageRender/PiratePxPageRender";

const AddUserPage = () => {
  return (
    <main className={styles.container}>
      <PiratePxPageRender COUNT_IDENTIFIER={"add-user"} />
      <h1>Add user</h1>
    </main>
  );
};

export default AddUserPage;
