// React and Third-Party Libraries
import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * HelmetMetaTagsNetlify component for Single Page Application hosted on Netlify.
 *
 * Generates meta tags and supports dynamic setting of title, description, image, path, and author meta tags based on provided props.
 * Requires prerender beta to be set to activate in Netlify account, which again requires meta name='fragment' content='!' on each page (accomplished by calling this component).
 * Requires react-helmet-async .
 *
 * @param {Object} props - The props object.
 * @param {string} props.title - The title of the page.
 * @param {string} props.description - The description of the page.
 * @param {string} props.image - The absolute URL for the meta tags image.
 * @param {string} props.path - Additional path segments to append to the default URL.
 * @param {string} props.author - The author of the page.
 * @returns {JSX.Element} React component. */
const HelmetMetaTagsNetlify = ({ title, description, image, path, author }) => {
  // Define default values
  const defaultDescription =
    "Gemeinsame Ausgaben bequem begleichen. Keine Anmeldung, kein Tracking, vollständige Datenlöschung nach Verwendung.";
  const defaultTitle = "InstantSplit";
  const defaultImage = "https://instantsplit.de/metaTagDefaultImg.png";
  const defaultUrl = "https://www.instantsplit.de/";
  const defaultAuthor = "Felix Schmidt";

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
};

export default HelmetMetaTagsNetlify;
