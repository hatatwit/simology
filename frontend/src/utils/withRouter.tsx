import { useTheme } from "@contexts/ThemeContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
  const ComponentWithRouterProps = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const { toggleTheme, isDarkMode } = useTheme();

    return (
      <Component
        {...props}
        location={location}
        navigate={navigate}
        params={params}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
    );
  };
  return ComponentWithRouterProps;
};

export default withRouter;
