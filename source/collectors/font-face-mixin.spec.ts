import { collectFromFontFaces } from './font-face-mixin';

describe('#collectFromFontFaces', () => {

  it('should give back empty array if there is no font in the given input', () => {
    const html = '<div>What</div>';
    expect(collectFromFontFaces(html)).toEqual([]);
  });


  it('should give back font family from font-face', () => {
    const html = `
      @font-face {
        font-family:'Vardono';
      }
    `;
    expect(collectFromFontFaces(html)).toEqual(['Vardono']);
  });


  it('should not give back font family if its not in font-face mixin', () => {
    const html = `
      body: {
        font-family:Roboto;
      }
      h1: {
        font-family:Verdana;
      }
    `;
    expect(collectFromFontFaces(html)).toEqual([]);
  });


  it('should give back only font families', () => {
    const html = `
      @font-face {
        font-color: red;
        font-family:Arial;
        font-style: normal;
      }
    `;
    expect(collectFromFontFaces(html)).toEqual(['Arial']);
  });


  it('should ignore whitespaces, and ticks around font families', () => {
    const html = `
      @font-face {
        font-family: 'Montserrat';
      }
    `;
    expect(collectFromFontFaces(html)).toEqual(['Montserrat']);
  });


  it('should works with mustache too', () => {
    const html = `
      @font-face {
        font-family: "Montserrat";
      }
    `;
    expect(collectFromFontFaces(html)).toEqual(['Montserrat']);
  });


  it('should collect every font family', () => {
    const html = `
      @font-face {
        font-family: 'Montserrat';
      }
      @font-face {
        font-family: 'Wharane';
      }
    `;
    expect(collectFromFontFaces(html)).toEqual(['Montserrat', 'Wharane']);
  });

});

