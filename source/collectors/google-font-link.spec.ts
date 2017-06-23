import { collectFromGoogleFontLinks } from './';

describe('#collectFontFamilies', () => {

  it('should give back empty array if there is no custom font in the given email', () => {
    const html = `
      <html>
        <body>
          <div>Yo!</div>
        </body>
      </html>
    `;
    expect(collectFromGoogleFontLinks(html)).toEqual([]);
  });


  it('should find the given font family from link tag', () => {
    const html = `
      <head>
        <link href="http://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
      </head>
    `;
    expect(collectFromGoogleFontLinks(html).length).toEqual(1);
  });


  it('should not find non custom font css link', () => {
    const html = `
      <link href="http://foobar.com/css?family=red" rel="stylesheet" type="text/css">
    `;
    expect(collectFromGoogleFontLinks(html).length).toEqual(0);
  });


  it('should give back the custom font name', () => {
    const html = `
      <link href="http://fonts.googleapis.com/css?family=Open" rel="stylesheet" type="text/css">
    `;
    expect(collectFromGoogleFontLinks(html)).toEqual(['Open']);
  });


  it('should give back the custom font name with normalized name', () => {
    const html = `
      <link href="http://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
    `;
    expect(collectFromGoogleFontLinks(html)).toEqual(['Open Sans']);
  });


  it('should give back the custom font name when size and language options are added', () => {
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

});
