import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import PiratePxPageRender from "../../components/reusableComponents/PiratePxPageRender/PiratePxPageRender";
import NavigateButton from "../../components/reusableComponents/NavigateButton/NavigateButton";

const HomePage = () => {
  return (
    <main className={styles.container}>
      <PiratePxPageRender COUNT_IDENTIFIER={"homepage"} />
      <h1>gatha - get together</h1>
      <p>This is the homepage.</p>
      <NavigateButton route={"user-registration"} buttonText={"Register"} />
    </main>
  );
};

export default HomePage;
