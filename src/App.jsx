import { ConfigProvider } from "antd";
import "./App.scss";
import "@/config/global";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Routes from "@/pages/Routes";
import { useAuthContext } from "@/context/Auth";
import ScreenLoder from "@/components/misc/ScreenLoder";

function App() {
  const { isAppLoading } = useAuthContext();

  return (
    <>
      <ConfigProvider
        theme={{
          token: { colorPrimary: "#163557" },
          components: { Button: { controlOutlineWidth: 0 } },
        }}
      >
        {isAppLoading ? <ScreenLoder /> : <Routes />}
      </ConfigProvider>
    </>
  );
}

export default App;
