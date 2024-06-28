import Router from "./router";
import useThemeStore from "./store/useThemeStore";
import { ThemeProvider } from "styled-components";
import lightTheme from "./styles/themes/lightTheme";
import darkTheme from "./styles/themes/darkTheme";
import GlobalStyles from "./styles/global.styles";
import { ConfigProvider, theme } from "antd";
import uzUZ from "antd/locale/uz_UZ";
import ruRU from "antd/locale/ru_RU";
import enUS from "antd/locale/en_US";

function App() {
  const { mode } = useThemeStore();

  const THEME = mode === "light" ? lightTheme : darkTheme;

  const config = {
    token: {
      colorPrimary: THEME.colors.primaryColor,
      colorBgBase: THEME.colors.backgroundBaseNormal,
      colorTextBase: THEME.colors.textBasePrimary,
      borderRadius: 6,
      fontFamily: "Poppins",
      fontSize: 14,

      colorText: THEME.colors.textBasePrimary,
      colorTextSecondary: THEME.colors.textBaseSecondary,
      colorTextTertiary: THEME.colors.textBaseTertiary,
    },
    algorithm: [theme.compactAlgorithm],
  };

  return (
    <ConfigProvider theme={config} locale={uzUZ}>
      <ThemeProvider theme={THEME}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
