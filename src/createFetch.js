/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */

type Fetch = (url: string, options: ?any) => Promise<any>;

type Options = {
  baseUrl: string,
  cookie?: string,
};

function createFetch(fetch: Fetch, { baseUrl, cookie }: Options) {
  const defaults = {
    method: 'POST',
    mode: baseUrl ? 'cors' : 'same-origin',
    credentials: baseUrl ? 'include' : 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie } : null),
    },
  };

  return (url: string, options: any) => ((url.startsWith('/graphql') || url.startsWith('/api')) ?
    fetch(`${baseUrl}${url}`, {
      ...defaults,
      ...options,
      headers: {
        ...defaults.headers,
        ...(options && options.headers),
      },
    }) : fetch(url, options));
}

export default createFetch;
