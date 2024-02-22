/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { useEffect, useState } from "react";

import aemHeadlessClient from "./aemHeadlessClient";

const { REACT_APP_ENDPOINT } = process.env;

/**
 * This file contains the React useEffect custom hooks that:
 * 1. Are called by the React components
 * 2. To get data from AEM GraphQL persisted queries
 *
 * Each custom hook maps to a persisted query and is responsible for:
 * 1. Calling the AEM persisted query
 * 2. Collecting and transforming the returned data into the format expected by the React view components
 * 3. Setting and returning any error state
 */

/**
 * Private, shared function that invokes the AEM Headless client.
 *
 * @param {String} persistedQueryName the fully qualified name of the persisted query
 * @param {*} queryParameters an optional JavaScript object containing query parameters
 * @returns the GraphQL data or an error message
 */
async function fetchPersistedQuery(persistedQueryName, queryParameters) {
  let data;
  let err;

  try {
    // AEM GraphQL queries are asynchronous, either await their return or use Promise-based .then(..) { ... } syntax
    const response = await aemHeadlessClient.runPersistedQuery(
      persistedQueryName,
      queryParameters
    );
    // The GraphQL data is stored on the response's data field
    data = response?.data;
  } catch (e) {
    // An error occurred, return the error messages
    err = e.toJSON()?.message;
  }

  return { data, err };
}

/**
 * Calls the 'page-by-slug' persisted query with `slug` parameter.
 *
 * @param {String!} slugName the page slug
 * @param {*} params option parameters
 * @returns a JSON object representing the Page
 */
export function usePageBySlug(slugName) {
  const [page, setPage] = useState(null);
  const [references, setReferences] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const gqlParams = {};

      const params = new URLSearchParams(document.location.search);
      for (const param of ["variation"]) {
        const value = params.get(param);
        if (value) {
          gqlParams[param] = value;
        }
      }

      // The key is 'slug' as defined in the persisted query
      const queryVariables = {
        ...gqlParams,
        slug: slugName,
      };

      // Call the AEM GraphQL persisted query named "page-by-slug" with parameters
      const response = await fetchPersistedQuery(
        REACT_APP_ENDPOINT + "/page-by-slug",
        queryVariables
      );

      if (response.err) {
        // Capture errors from the HTTP request
        setErrors(response.err);
      } else if (response.data?.pageList?.items?.length === 1) {
        // Set the Page data after data validation
        setPage(response.data.pageList.items[0]);
        setReferences(response.data.pageList._references);
      } else {
        // Set an error if no Page could be found
        setErrors(`Cannot find Page with slug: ${slugName}`);
      }
    }

    // Call the internal fetchData() as per React best practices
    fetchData();
  }, [slugName]);

  return { page, references, errors };
}
