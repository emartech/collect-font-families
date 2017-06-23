import { collectFontFamilies } from './';

describe('#collectFontFamilies', () => {

  it('should give back the font face families', () => {
    const html = `
      @font-face {
        font-family: 'Montserrat';
      }
      @font-face {
        font-family: 'Wharane';
      }
    `;
    expect(collectFontFamilies(html)).toEqual(['Montserrat', 'Wharane']);
  });


  it('should give back the link font families', () => {
    const html = `
      <link href="https://fonts.googleapis.com/css?family=Open+Sans&amp;subset=greek,latin-ext" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro&amp;subset=latin-ext" rel="stylesheet">
    `;
    expect(collectFontFamilies(html)).toEqual(['Open Sans', 'Source Sans Pro']);
  });


  it('should give back both with ABC ordering', () => {
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
    expect(collectFontFamilies(html)).toEqual(['Ampalap', 'Open Sans', 'Wharane']);
  });


  it('should give the font family once if multiple time exists', () => {
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
    expect(collectFontFamilies(html)).toEqual(['Open Sans']);
  });

});
