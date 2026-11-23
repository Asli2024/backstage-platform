
import { createApp } from '@backstage/frontend-defaults';
import { createFrontendModule } from '@backstage/frontend-plugin-api';
import {
  ThemeBlueprint,
  SignInPageBlueprint,
} from '@backstage/plugin-app-react';
import { UnifiedThemeProvider } from '@backstage/theme';
import { SignInPage } from '@backstage/core-components';
import { githubAuthApiRef } from '@backstage/core-plugin-api';

import catalogPlugin from '@backstage/plugin-catalog/alpha';

import { navModule } from './modules/nav';
import { homeModule } from './modules/home';
import { slateBlueLight, slateBlueDark } from './theme/slateBlue';
import './theme/styles.css';

// Light theme
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

// Dark theme
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

// Theme registration
const themeModule = createFrontendModule({
  pluginId: 'app',
  extensions: [lightTheme, darkTheme],
});

// GitHub OAuth sign-in
const signInPage = SignInPageBlueprint.make({
  params: {
    loader: async () => props => (
      <SignInPage
        {...props}
        provider={{
          id: 'github-auth-provider',
          title: 'GitHub',
          message: 'Sign in to Platform Hub using GitHub',
          apiRef: githubAuthApiRef,
        }}
      />
    ),
  },
});

// Authentication frontend module
const authModule = createFrontendModule({
  pluginId: 'app',
  extensions: [signInPage],
});

// Platform Hub application
export default createApp({
  features: [
    catalogPlugin,
    navModule,
    homeModule,
    themeModule,
    authModule,
  ],
});
