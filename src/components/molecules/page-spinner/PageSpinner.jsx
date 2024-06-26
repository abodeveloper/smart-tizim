import { Flex } from "antd";
import { ClockLoader } from "react-spinners";

const PageSpinner = () => {
  return (
    <Flex
      align="center"
      justify="center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <ClockLoader size={60} color={"#6691E7"} />
    </Flex>
  );
};

export default PageSpinner;
