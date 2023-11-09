import styles from "./MainPage.module.css";
import PiratePxPageRender from "../../components/reusableComponents/PiratePxPageRender/PiratePxPageRender";
import NavigateButton from "../../components/reusableComponents/NavigateButton/NavigateButton";

const MainPage = () => {
  return (
    <main className={styles.container}>
      <PiratePxPageRender COUNT_IDENTIFIER={"main"} />
      <h1>gatha - get together</h1>
      <p>To get started, either create a join a group</p>
      <NavigateButton route={"create-group"} buttonText={"create a group"} />
      <NavigateButton route={"join-group"} buttonText={"join a group"} />
    </main>
  );
};

export default MainPage;
