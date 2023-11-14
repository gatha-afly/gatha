import styles from "./HomePage.module.css";
<<<<<<< HEAD
import PiratePxPageRender from "../../components/reusableComponents/PiratePxPageRender/PiratePxPageRender";
import NavigateButton from "../../components/reusableComponents/NavigateButton/NavigateButton";
import HelmetMetaTagsNetlify from "../../components/reusableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
=======
import { Link } from "react-router-dom";
import Message from "../../components/Message";
>>>>>>> feature/message

const HomePage = () => {
  return (
    <main className={styles.container}>
<<<<<<< HEAD
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"homepage"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - get together' />
      <h1>gatha - get together</h1>
      <p>This is the homepage.</p>
      <NavigateButton route={"user-registration"} buttonText={"Register"} />
=======
      {/*     <h1>gatha - get together</h1>
      <p>This is the homepage.</p> */}
      <Message />
      {/*       <Link to="/user-registration">Register</Link> */}
>>>>>>> feature/message
    </main>
  );
};

export default HomePage;
