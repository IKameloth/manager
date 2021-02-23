import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  @function hsb($h-hsb, $s-hsb, $b-hsb, $a: 1) {
    @if $b-hsb == 0 {
      @return hsla(0, 0, 0, $a);
    } @else {
      $l-hsl: ($b-hsb/2) * (2 - ($s-hsb/100));
      $s-hsl: ($b-hsb * $s-hsb) / if($l-hsl < 50, $l-hsl * 2, 200 - $l-hsl * 2);
      @return hsla($h-hsb, $s-hsl, $l-hsl, $a);
    }
  }

  @mixin caption {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
  }

  @mixin button {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
  }

  $btn-transition: all 250ms cubic-bezier(0.27, 0.01, 0.38, 1.06);
  $dark-base-600: hsb(210, 15, 42, 1);
  $text-black-medium-emphasis: hsb(210, 8, 46, 1);
  $text-black-high-emphasis: hsb(210, 20, 16, 1);

  #root {
    font-family: 'DM Sans', sans-serif;
    background: #fafafa;
    display: grid;
    grid-gap: 8px;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(8, 1fr);
    height: 100vh;

    @media ${({ theme }) => theme.mediaQueries.minWidth1024} {
      grid-gap: 32px;
    }

    @media ${({ theme }) => theme.mediaQueries.minWidth768} {
      grid-gap: 16px;
    }

    @media (max-width: 768px) {
      grid-gap: 16px;
    }

    .control.has-icons-left .icon, .control.has-icons-right .icon {
      z-index: 1;
    }

    .modal-background {
      z-index: 6;
    }
  }

  *,
  *:after,
  *:before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .focus-link {
    color: rgb(41, 98, 255);
    background: rgb(240, 244, 255);
    border: 1px solid rgb(195, 211, 255);
  }

`;

export default GlobalStyle;