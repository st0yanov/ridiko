import React from 'react';
import Layout from '../../components/Layout';
import Trips from './Trips';

const title = 'Trip History';

async function action({ fetch }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: '{trips{dateAdded,dateDropped,' +
             'source,startTime,destination,freeSeats},' +
             'tripSearches{dateStarted,dateDropped,destination}}',
    }),
  });
  const { data } = await resp.json();
  if (!data || !data.trips || !data.tripSearches) { throw new Error('Failed to load trip history.'); }
  return {
    chunks: ['trips'],
    title,
    component: (<Layout><Trips
      title={title}
      trips={data.trips}
      tripSearches={data.tripSearches}
    /></Layout>),
  };
}

export default action;
