import { createGlobalStyle } from 'styled-components'

import fontFiles from './fonts'

const GlobalStyle = createGlobalStyle`
@font-face { 
    font-family: "SarabunLight";
    font-display: fallback;
    font-style: normal; 
    font-weight: normal; 
    src: local("Sarabun Light"), local("SarabunLight"), url(${
      fontFiles.SarabunLightTTF
    }) format("truetype"), url(${fontFiles.SarabunLightWOFF}) format("woff"); 
}

@font-face { 
    font-family: "SarabunLightItalic"; 
    font-display: fallback;
    font-style: normal; 
    font-weight: normal; 
    src: local("Sarabun LightItalic"), local("SarabunLightItalic"), url(${
      fontFiles.SarabunLightItalicTTF
    }) format("truetype"), url(${
  fontFiles.SarabunLightItalicWOFF
}) format("woff"); 
}

@font-face { 
    font-family: "Sarabun"; 
    font-display: fallback;
    font-style: normal; 
    font-weight: normal; 
    src: local("Sarabun Regular"), local("SarabunRegular"), url(${
      fontFiles.SarabunRegularTTF
    }) format("truetype"), url(${fontFiles.SarabunRegularWOFF}) format("woff"); 
}

@font-face { 
    font-family: "SarabunItalic"; 
    font-display: fallback;
    font-style: normal; 
    font-weight: normal; 
    src: local("Sarabun Italic"), local("SarabunItalic"), url(${
      fontFiles.SarabunItalicTTF
    }) format("truetype"), url(${fontFiles.SarabunItalicWOFF}) format("woff"); 
}

@font-face { 
    font-family: "SarabunMedium"; 
    font-display: fallback;
    font-style: normal; 
    font-weight: normal; 
    src: local("Sarabun Medium"), local("SarabunMedium"), url(${
      fontFiles.SarabunMediumTTF
    }) format("truetype"), url(${fontFiles.SarabunMediumWOFF}) format("woff"); 
}

@font-face { 
    font-family: "SarabunMediumItalic";
    font-display: fallback;
    font-style: normal; 
    font-weight: normal; 
    src: local("Sarabun MediumItalic"), local("SarabunMediumItalic"), url(${
      fontFiles.SarabunMediumItalicTTF
    }) format("truetype"), url(${
  fontFiles.SarabunMediumItalicWOFF
}) format("woff"); 
}

@font-face { 
    font-family: "SarabunSemibold";
    font-display: fallback;
    font-style: normal; 
    font-weight: normal; 
    src: local("Sarabun Semibold"), local("SarabunSemibold"), url(${
      fontFiles.SarabunSemiboldTTF
    }) format("truetype"), url(${
  fontFiles.SarabunSemiboldWOFF
}) format("woff"); 
}

@font-face { 
    font-family: "SarabunSemiboldItalic"; 
    font-display: fallback;
    font-style: normal; 
    font-weight: normal; 
    src: local("Sarabun SemiboldItalic"), local("SarabunSemiboldItalic"), url(${
      fontFiles.SarabunSemiboldItalicTTF
    }) format("truetype"), url(${
  fontFiles.SarabunSemiboldItalicWOFF
}) format("woff"); 
}

@font-face { 
    font-family: "SarabunBold";
    font-display: fallback;
    font-style: normal; 
    font-weight: normal; 
    src: local("Sarabun Bold"), local("SarabunBold"), url(${
      fontFiles.SarabunBoldTTF
    }) format("truetype"), url(${fontFiles.SarabunBoldWOFF}) format("woff"); 
}

@font-face { 
    font-family: "SarabunBoldItalic"; 
    font-display: fallback;
    font-style: normal; 
    font-weight: normal; 
    src: local("Sarabun BoldItalic"), local("SarabunBoldItalic"), url(${
      fontFiles.SarabunBoldItalicTTF
    }) format("truetype"), url(${
  fontFiles.SarabunBoldItalicWOFF
}) format("woff"); 
}


    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    html {
        box-sizing: border-box;
        background: #011523;
        color: #DCEAF4;
      }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        font-family: Sarabun, sans-serif;
        -webkit-tap-highlight-color: rgba(0,0,0,.05);
    }
    a {
        text-decoration: none;
    }
    a:visited, a:hover, a:active {
        color: #dceaf4;
    }
`

export default GlobalStyle
