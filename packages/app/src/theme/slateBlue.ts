import {
  createBaseThemeOptions,
  createUnifiedTheme,
  palettes,
} from '@backstage/theme';

export const slateBlueLight = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: {
      ...palettes.light,
      primary: {
        main: '#2563EB',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#1D4ED8',
      },
      background: {
        default: '#F9FAFB',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#111827',
        secondary: '#4B5563',
      },
      divider: '#D1D5DB',
      navigation: {
        ...palettes.light.navigation,
        background: '#FFFFFF',
        color: '#4B5563',
        selectedColor: '#2563EB',
        indicator: '#2563EB',
      },
    },
  }),
  defaultPageTheme: 'home',
});

export const slateBlueDark = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: {
      ...palettes.dark,
      primary: {
        main: '#60A5FA',
        contrastText: '#111827',
      },
      secondary: {
        main: '#93C5FD',
      },
      background: {
        default: '#111827',
        paper: '#1F2937',
      },
      text: {
        primary: '#F9FAFB',
        secondary: '#D1D5DB',
      },
      divider: '#374151',
      navigation: {
        ...palettes.dark.navigation,
        background: '#1F2937',
        color: '#D1D5DB',
        selectedColor: '#60A5FA',
        indicator: '#60A5FA',
      },
    },
  }),
  defaultPageTheme: 'home',
});
