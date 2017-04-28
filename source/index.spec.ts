import * as test from 'tape';
import { singleTest } from './lib/test';
import { collectFontFamilies } from './';

singleTest('should give back the font face families', (t: test.Test) => {
  const html = `
    @font-face {
      font-family: 'Montserrat';
    }
    @font-face {
      font-family: 'Wharane';
    }
  `;
  t.deepEqual(collectFontFamilies(html), ['Montserrat', 'Wharane']);
});

singleTest('should give back the link font families', (t: test.Test) => {
  const html = `
    <link href="https://fonts.googleapis.com/css?family=Open+Sans&amp;subset=greek,latin-ext" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro&amp;subset=latin-ext" rel="stylesheet">
  `;
  t.deepEqual(collectFontFamilies(html), ['Open Sans', 'Source Sans Pro']);
});

singleTest('should give back both with ABC ordering', (t: test.Test) => {
  const html = `
    <head>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans&amp;subset=greek,latin-ext" rel="stylesheet">
      <style>
        @font-face {
          font-family: 'Wharane';
        }
      </style>
      <link href="https://fonts.googleapis.com/css?family=Ampalap&amp;subset=greek,latin-ext" rel="stylesheet">
    </head>
  `;
  t.deepEqual(collectFontFamilies(html), ['Ampalap', 'Open Sans', 'Wharane']);
});

singleTest('should give the font family once if multiple time exists', (t: test.Test) => {
  const html = `
    <head>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans&amp;subset=greek,latin-ext" rel="stylesheet">
      <style>
        @font-face {
          font-family: 'Open Sans';
        }
      </style>
    </head>
  `;
  t.deepEqual(collectFontFamilies(html), ['Open Sans']);
});
