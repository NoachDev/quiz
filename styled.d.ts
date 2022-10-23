import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    bg        : string
    fg        : string
    complement: string
    shadow    : string
    box_shadow: string
  }
}