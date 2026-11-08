import { createApp } from '@backstage/frontend-defaults';
import { createFrontendModule } from '@backstage/frontend-plugin-api';
import { ThemeBlueprint } from '@backstage/plugin-app-react';
import { UnifiedThemeProvider } from '@backstage/theme';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import { navModule } from './modules/nav';
import { homeModule } from './modules/home';
import { slateBlueLight, slateBlueDark } from './theme/slateBlue';
import './theme/styles.css';

const lightTheme = ThemeBlueprint.make({
  name: 'slate-blue-light',
  params: {
    theme: {
      id: 'slate-blue-light',
      title: 'Slate & Blue Light',
      variant: 'light',
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={slateBlueLight}>
          {children}
        </UnifiedThemeProvider>
      ),
    },
  },
});

const darkTheme = ThemeBlueprint.make({
  name: 'slate-blue-dark',
  params: {
    theme: {
      id: 'slate-blue-dark',
      title: 'Slate & Blue Dark',
      variant: 'dark',
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={slateBlueDark}>
          {children}
        </UnifiedThemeProvider>
      ),
    },
  },
});

const themeModule = createFrontendModule({
  pluginId: 'app',
  extensions: [lightTheme, darkTheme],
});

export default createApp({
  features: [catalogPlugin, navModule, homeModule, themeModule],
});
