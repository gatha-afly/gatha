import styles from "./InviteUserPage.module.css";
import PiratePxPageRender from "../../components/reusableComponents/PiratePxPageRender/PiratePxPageRender";

const InviteUserPage = () => {
  return (
    <main className={styles.container}>
      <PiratePxPageRender COUNT_IDENTIFIER={"invite-user"} />
      <h1>invite user</h1>
    </main>
  );
};

export default InviteUserPage;
