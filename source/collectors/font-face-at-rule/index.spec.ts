import { collectFromFontFaces } from './';

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

  [
    {
      name: 'Double qoutes',
      style: `
      @font-face {
        font-family: "Bitstream Vera Serif Bold";
        src: url("https://mdn.mozillademos.org/files/2468/VeraSeBd.ttf");
      }`
    },
    {
      name: 'Single qoutes',
      style: `
      @font-face {
        font-family: 'Bitstream Vera Serif Bold';
        src: url("https://mdn.mozillademos.org/files/2468/VeraSeBd.ttf");
      }`
    },
    {
      name: 'Backtick',
      style: `
      @font-face {
        font-family: \`Bitstream Vera Serif Bold\`;
        src: url("https://mdn.mozillademos.org/files/2468/VeraSeBd.ttf");
      }`
    }
  ].forEach(({ style, name }) =>

  it(`should get one font face object with all properties (${name})`, () => {
    expect(collectFromFontFaces(style)).toEqual(['Bitstream Vera Serif Bold']);
  }));


  [
    {
      name: 'Without linebreaks',
      style: `
      @font-face {
        font-family: Hoefler Text Ornaments;
        src: local(HoeflerText-Ornaments);
      }`
    },
    {
      name: 'With linebreaks',
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
      style: `
      @font-face{font-family:Hoefler Text Ornaments;src:local(HoeflerText-Ornaments);}`
    }
  ].forEach(({ style }) =>

  it('should get one font face object with all properties', () => {
    expect(collectFromFontFaces(style)).toEqual(['Hoefler Text Ornaments']);
  }));


  it('should parse src as an array of definitions', () => {
    const style = `
    @font-face {
      font-family: bodytext;
      src: url(ideal-sans-serif.woff) format("woff"),
        url(basic-sans-serif.ttf) format("opentype");
    }`;
    expect(collectFromFontFaces(style)).toEqual(['bodytext']);
  });


  it('should parse src as an array of definitions', () => {
    const style = `
    @font-face {
      font-family: bodytext;
      src: local(Gentium Bold),
        local(Gentium-Bold),
        url(GentiumBold.woff);
      font-weight: bold;
    }`;
    expect(collectFromFontFaces(style)).toEqual(['bodytext']);
  });


  it('should get all font face object as an array', () => {
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

