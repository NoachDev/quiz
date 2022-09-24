import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    bg        : string
    fg        : string
    comlement : string
  }
}