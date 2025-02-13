import React from "react";
import styled from "styled-components";
import IconButtonAtom from "../atoms/IconButtonAtom";
import HeadingAtom from "../atoms/HeadingAtom";

// 스타일링된 컨테이너
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  gap: 8px;
`;

// 알림 제목 스타일링 (옵션, 재사용을 위해)
const Title = styled(HeadingAtom)`
  flex-grow: 1;
  color: #333333;
  text-align: center;
  font-size: 18px;
`;

interface NotificationHeaderProps {
  title: string;
  type: "info" | "success" | "warning" | "error";
  onConfirm: () => void;
  onCancel?: () => void;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  title,
  type,
  onConfirm,
  onCancel,
}) => {
  const iconColorMap = {
    info: "orange",
    success: "green",
    warning: "#FF9800",
    error: "#F44336",
  };

  return (
    <HeaderContainer>
      {/* 상태 아이콘 */}
      <IconButtonAtom
        label="상태 아이콘"
        BGcolor="transparent"
        variant="ghost"
        icontype="bell" // 상태에 맞는 아이콘으로 변경 가능
        color={iconColorMap[type]} // 상태별 색상 적용
      />

      {/* 알림 제목 */}
      <Title level={2}>{title}</Title>

      {/* 닫기 버튼 */}
      <IconButtonAtom
        label="닫기"
        BGcolor="transparent"
        variant="ghost"
        icontype="ex" // 닫기 버튼 아이콘
        color="#AAAAAA"
        onClick={() => onCancel && onCancel()}
      />
    </HeaderContainer>
  );
};

export default NotificationHeader;
