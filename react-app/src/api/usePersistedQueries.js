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
    const response = await aemHeadlessClient.runPersistedQuery(
      persistedQueryName,
      queryParameters
    );
    data = response?.data;
  } catch (e) {
    err = e.toJSON()?.message;
  }

  return { data, err };
}

/**
 * Calls the 'page-by-slug' persisted query with `slug` and `variation` parameter.
 *
 * @param {String!} slug the page slug
 * @param {String} variation the page variation
 * @returns a JSON object representing the Page
 */
export function usePageBySlug(slug, variation = "master", fetchTrigger) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const queryVariables = {
        slug,
        variation,
      };

      const response = await fetchPersistedQuery(
        REACT_APP_ENDPOINT + "/page-by-slug",
        queryVariables
      );

      if (response?.err) {
        setError(response.err);
      } else if (response?.data?.pageList?.items?.length === 1) {
        setData(response.data.pageList.items[0]);
      }
    }

    fetchData();
  }, [slug, variation, fetchTrigger]);

  return { data, error };
}

/**
 * Calls the 'teaser-list-by-path' persisted query with `path` and `variation` parameter.
 *
 * @param {String!} path the _path of the cf
 * @returns a JSON object representing the Article
 */
export function useTeaserListByPath(path, variation = "master", fetchTrigger) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const queryVariables = {
        path,
        variation,
      };

      const response = await fetchPersistedQuery(
        REACT_APP_ENDPOINT + "/teaser-list-by-path",
        queryVariables
      );

      if (response?.err) {
        setError(response.err);
      } else if (response?.data?.teaserListList?.items?.length === 1) {
        setData(response.data.teaserListList.items[0]);
      }
    }

    fetchData();
  }, [path, variation, fetchTrigger]);

  return { data, error };
}

/**
 * Calls the 'article-by-slug' persisted query with `slug` parameter.
 *
 * @param {String!} slug the page slug
 * @returns a JSON object representing the Article
 */
export function useArticleBySlug(slug) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const queryVariables = {
        slug: slug,
      };

      const response = await fetchPersistedQuery(
        REACT_APP_ENDPOINT + "/article-by-slug",
        queryVariables
      );

      if (response?.err) {
        setError(response.err);
      } else if (response?.data?.articleList?.items?.length === 1) {
        setData(response.data.articleList.items[0]);
      }
    }

    fetchData();
  }, [slug]);

  return { data, error };
}

/**
 * Calls the 'service-by-slug' persisted query with `slug` parameter.
 *
 * @param {String!} slug the page slug
 * @returns a JSON object representing the Service
 */
export function useServiceBySlug(slug) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const queryVariables = {
        slug,
      };

      const response = await fetchPersistedQuery(
        REACT_APP_ENDPOINT + "/service-by-slug",
        queryVariables
      );

      if (response?.err) {
        setError(response.err);
      } else if (response?.data?.serviceList?.items?.length === 1) {
        setData(response.data.serviceList.items[0]);
      }
    }

    fetchData();
  }, [slug]);

  return { data, error };
}

/**
 * Calls the 'articles' persisted query with `first` parameter.
 *
 * @param {String} [first] first x number of articles to fetch
 * @returns a JSON object representing the Articles
 */
export function useArticles(first) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const queryVariables = {};

      first && (queryVariables.first = first);

      const response = await fetchPersistedQuery(
        REACT_APP_ENDPOINT + "/articles",
        queryVariables
      );

      if (response?.err) {
        setError(response.err);
      } else if (response?.data?.articlePaginated?.edges?.length) {
        setData(response.data.articlePaginated.edges);
      }
    }

    fetchData();
  }, [first]);

  return { data, error };
}

/**
 * Calls the 'services' persisted query with `first` parameter.
 *
 * @param {String} [first] first x number of services to fetch
 * @returns a JSON object representing the Services
 */
export function useServices(first) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryVariables = {};

    first && (queryVariables.first = first);

    async function fetchData() {
      const response = await fetchPersistedQuery(
        REACT_APP_ENDPOINT + "/services",
        queryVariables
      );

      if (response?.err) {
        setError(response.err);
      } else if (response?.data?.servicePaginated?.edges?.length) {
        setData(response.data.servicePaginated.edges);
      }
    }

    fetchData();
  }, [first]);

  return { data, error };
}
