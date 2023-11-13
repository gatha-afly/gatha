/* eslint-disable react/prop-types */
import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * HelmetMetaTags component for SPA hosted on Netlify
 *
 * Generates meta tags and supports dynamic setting of title, description, image, path and author meta tags. It has default values for each, so none must be added, but the component must be added to each page, as otherwise there won't be meta tags on the page.
 *
 * Requires prerender beta to be set to activate in Netlify account, which again requires meta name='fragment' content='!' on each page (accomplished by calling this component). Be sure to use react-helmet-async and properly add it to the project.
 *
 *
 * @param {string} props.title -
 * @param {string} props.description
 * @param {string} props.image - Meta tags image absolute URL
 * @param {string} props.author
 *
 * @returns {JSX.Element} The HelmetMetaTags component.
 */
function HelmetMetaTagsNetlify({ title, description, image, author }) {
  // Define default values
  const defaultDescription = "gatha";
  const defaultTitle = "gatha - get together";
  const defaultImage = "https://gatha.netlify.app/metaTagDefaultImg.jpeg";
  const defaultUrl = "https://gatha.netlify.app/";
  const defaultAuthor = "Abdulwase Naeemi, Felix Schmidt & Yesim Demir";

  // Use default values if the corresponding props are not provided
  const pageTitle = title || defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageImage = image || defaultImage;
  const pageAuthor = author || defaultAuthor;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name='description' content={pageDescription} />
      <meta property='og:title' content={pageTitle} />
      <meta property='og:description' content={pageDescription} />
      <meta property='og:image' content={pageImage} />
      <meta property='og:url' content={defaultUrl} />
      <meta property='og:type' content='website' />
      <meta name='twitter:title' content={pageTitle} />
      <meta name='twitter:description' content={pageDescription} />
      <meta name='twitter:image' content={pageImage} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='author' content={pageAuthor} />
      <meta name='fragment' content='!' />
    </Helmet>
  );
}

export default HelmetMetaTagsNetlify;
