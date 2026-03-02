import React from 'react';
import { renderToString } from 'react-dom/server';
import { Services } from './components/Pages/Services';

try {
  const html = renderToString(<Services onOpenBooking={() => { }} />);
  console.log("Render successful! Length:", html.length);
} catch (e) {
  console.error("Render failed!");
  console.error(e);
}
