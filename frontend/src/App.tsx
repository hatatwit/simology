import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "@components/AppLayout";
import { ConfigProvider, Spin } from "antd";
import { useTheme } from "@contexts/ThemeContext";

const Index = lazy(() => import("@pages/Index"));

const App = () => {
  const { theme, algorithm } = useTheme();

  return (
    <ConfigProvider
      theme={{
        token: theme.token,
        algorithm: algorithm,
      }}
    >
      <BrowserRouter>
        <Suspense fallback={<Spin tip="Loading" fullscreen />}>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Index />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
