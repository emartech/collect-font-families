import { collectFromFontFaces } from './';

describe('#collectFromFontFaces', () => {

  it('should return empty array if undefined as html given', () => {
    const html = undefined;
    expect(collectFromFontFaces(html)).toEqual([]);
  });


  it('should return empty array if null as html given', () => {
    const html = null;
    expect(collectFromFontFaces(html)).toEqual([]);
  });


  it('should return empty array if empty string as html given', () => {
    const html = '';
    expect(collectFromFontFaces(html)).toEqual([]);
  });


  it('should return empty array if no font face in given html', () => {
    const html = '<style>body { background: red; }</style>';
    expect(collectFromFontFaces(html)).toEqual([]);
  });


  it('should return empty array if no font face mixin in given html', () => {
    const html = `
      <style>
        body: {
          font-family:Roboto;
        }
        h1: {
          font-family:Verdana;
        }
      </style>
    `;
    expect(collectFromFontFaces(html)).toEqual([]);
  });


  it('should return font family of font face', () => {
    const html = `
      <style>
        @font-face {
          font-family:Vardono;
        }
      </style>
    `;
    expect(collectFromFontFaces(html)).toEqual(['Vardono']);
  });


  it('should return only font families of font face', () => {
    const html = `
      @font-face {
        font-color: red;
        font-family:Arial;
        font-style: normal;
      }
    `;
    expect(collectFromFontFaces(html)).toEqual(['Arial']);
  });


  [
    {
      name: 'double qoutes',
      style: `
      @font-face {
        font-family: "Bitstream Vera Serif Bold";
        src: url("https://mdn.mozillademos.org/files/2468/VeraSeBd.ttf");
      }`
    },
    {
      name: 'single qoutes',
      style: `
      @font-face {
        font-family: 'Bitstream Vera Serif Bold';
        src: url("https://mdn.mozillademos.org/files/2468/VeraSeBd.ttf");
      }`
    },
    {
      name: 'sacktick',
      style: `
      @font-face {
        font-family: \`Bitstream Vera Serif Bold\`;
        src: url("https://mdn.mozillademos.org/files/2468/VeraSeBd.ttf");
      }`
    }
  ].forEach(({ name, style }) =>

  it(`should get one font face object with all properties (${name})`, () => {
    expect(collectFromFontFaces(style)).toEqual(['Bitstream Vera Serif Bold']);
  }));


  [
    {
      name: 'without linebreaks',
      style: `
      @font-face {
        font-family: Hoefler Text Ornaments;
        src: local(HoeflerText-Ornaments);
      }`
    },
    {
      name: 'with linebreaks',
      style: `
      @font-face
      {
        font-family:
        Hoefler Text Ornaments;

        src:
        local(HoeflerText-Ornaments);

      }`
    },
    {
      name: 'single-line',
      style: `
      @font-face{font-family:Hoefler Text Ornaments;src:local(HoeflerText-Ornaments);}`
    }
  ].forEach(({ name, style }) =>

  it(`should get one font face object with all properties (${name})`, () => {
    expect(collectFromFontFaces(style)).toEqual(['Hoefler Text Ornaments']);
  }));


  it('should get all font families from font faces as an array', () => {
    const style = `
    @font-face {
      font-family: MainText;
      src: url(http://example.com/font.woff);
      font-variant: oldstyle-nums proportional-nums styleset(1,3);
    }

    @font-face {
      font-family: bodytext;
      src: url(ideal-sans-serif.woff) format("woff"),
          url(basic-sans-serif.ttf) format("opentype");
    }

    @font-face {
      font-family: Gentium;
      src: url(http://example.com/fonts/Gentium.woff);
    }`;

    expect(collectFromFontFaces(style)).toEqual(['MainText', 'bodytext', 'Gentium']);
  });

});

