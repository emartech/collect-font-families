import { collectFromGoogleFontLinks } from './';

describe('#collectFromGoogleFontLinks', () => {

  it('should return empty array if undefined as html given', () => {
    const html = undefined;
    expect(collectFromGoogleFontLinks(html)).toEqual([]);
  });


  it('should return empty array if null as html given', () => {
    const html = null;
    expect(collectFromGoogleFontLinks(html)).toEqual([]);
  });


  it('should return empty array if empty string as html given', () => {
    const html = '';
    expect(collectFromGoogleFontLinks(html)).toEqual([]);
  });


  it('should return empty array if no google fonts api link in given html', () => {
    const html = `
      <head>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
      </head>
    `;
    expect(collectFromGoogleFontLinks(html)).toEqual([]);
  });


  it('should not find non custom font css link', () => {
    const html = `
      <head>
        <link href="http://foobar.com/css?family=red" rel="stylesheet" type="text/css">
      </head>
    `;
    expect(collectFromGoogleFontLinks(html)).toEqual([]);
  });


  it('should find the given font family from link tag', () => {
    const html = `
      <head>
        <link href="http://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
      </head>
    `;
    expect(collectFromGoogleFontLinks(html)).toEqual(['Open Sans']);
  });


  it('should return the custom font name', () => {
    const html = `
      <head>
        <link href="http://fonts.googleapis.com/css?family=Open" rel="stylesheet" type="text/css">
      </head>
    `;
    expect(collectFromGoogleFontLinks(html)).toEqual(['Open']);
  });


  it('should return the custom font name with normalized name', () => {
    const html = `
      <link href="http://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
    `;
    expect(collectFromGoogleFontLinks(html)).toEqual(['Open Sans']);
  });


  it('should return the custom font name when size and language options are added', () => {
    const html = `
      <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,700,700i&amp;subset=greek" rel="stylesheet">
    `;
    expect(collectFromGoogleFontLinks(html)).toEqual(['Open Sans']);
  });


  it('should find font family if only language options are given', () => {
    const html = `
      <link href="https://fonts.googleapis.com/css?family=Open+Sans&amp;subset=greek,latin-ext" rel="stylesheet">
    `;
    expect(collectFromGoogleFontLinks(html)).toEqual(['Open Sans']);
  });


  it('should work for more than one font family link', () => {
    const html = `
      <link href="https://fonts.googleapis.com/css?family=Open+Sans&amp;subset=greek,latin-ext" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro&amp;subset=latin-ext" rel="stylesheet">
      <link href="http://foobar.com/css?family=red" rel="stylesheet" type="text/css">
    `;
    expect(collectFromGoogleFontLinks(html)).toEqual(['Open Sans', 'Source Sans Pro']);
  });


  it('should work for multiple font families', () => {
    const html = `
    <link href="https://fonts.googleapis.com/css?family=Tangerine|Inconsolata|Droid+Sans" rel="stylesheet">
    `;

    expect(collectFromGoogleFontLinks(html)).toEqual(['Tangerine', 'Inconsolata', 'Droid Sans']);
  });


  it('should work for multiple font families with ', () => {
    const html = `
    <link href="https://fonts.googleapis.com/css?family=Tangerine|Inconsolata|Droid+Sans" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Anonymous+Pro:italic&subset=greek|Droid+Sans" rel="stylesheet">
    `;

    expect(collectFromGoogleFontLinks(html)).toEqual(['Tangerine', 'Inconsolata', 'Droid Sans', 'Anonymous Pro']);
  });

});
