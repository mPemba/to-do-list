import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { TaskContext } from "../lib/TaskContext";
import { colors } from "../lib/colors";

const Banner = () => {
  const { showBanner, setShowBanner } = useContext(TaskContext);

  useEffect(() => {
    setTimeout(() => {
      setShowBanner({
        show: false,
        message: "",
        type: "",
      });
    }, 3000);
  }, [setShowBanner]);

  return (
    <BannerContainer type={showBanner.type}>
      <BannerText>{showBanner.message}</BannerText>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  background-color: ${(props) => {
    if (props.type === "success") {
      return colors.green;
    } else if (props.type === "error") {
      return colors.red;
    }
  }};
`;

const BannerText = styled.p`
  color: ${colors.white};
  font-weight: 600;
`;

export { Banner };
