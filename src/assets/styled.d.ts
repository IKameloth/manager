import 'styled-components';
import { CSSObject } from 'styled-components';

declare module 'react' {
  interface Attributes {
    css?: CSSProp | CSSObject;
  };
};
