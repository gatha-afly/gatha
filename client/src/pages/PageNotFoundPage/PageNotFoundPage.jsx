import { Link } from "react-router-dom";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePxPageRender from "../../components/common/PiratePxPageRender/PiratePxPageRender";
import styles from "./PageNotFoundPage.module.css";
/**
 * 404 - Page Not Found page.
 * Renders information about the non-existent page and provides a link to the main page.
 *
 * @returns {JSX.Element} The rendered 404 - Page Not Found component.
 */
const PageNotFoundPage = () => {
  return (
    <main className={styles.container}>
      {/* Track page renders */}
      <PiratePxPageRender COUNT_IDENTIFIER={"page-not-found"} />
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='gatha - page not found' />
      <h1>🚧 404 - Page not found</h1>
      <p>The page you're looking for does not exist.</p>
      <Link to='/'>Go to main</Link>
    </main>
  );
};

export default PageNotFoundPage;
