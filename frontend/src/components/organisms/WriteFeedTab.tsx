import React, { useState } from "react";
import styled from "styled-components";
import FileUploadForm from "../atoms/FileUploadForm";
import TextInputForm from "../atoms/TextInputForm";
import TextboxAtom from "../atoms/TextboxAtom";
import TextareaForm from "../atoms/TextareaForm";
import ButtonAtom from "../atoms/ButtonAtom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usePageRender } from "./PageRenderContext";
const Container = styled.form`
  position: relative;
`;

export default function WriteFeedTab({ onClose }: { onClose: () => void }) {
  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [fileName, setFileName] = React.useState<Blob | null>(null);
  const navigate = useNavigate();
  // 컨텍스트 사용
  const { feedPageRender, setFeedPageRender } = usePageRender();

  const togglePageRender = () => {
    setFeedPageRender((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", titleValue);
    formData.append("content", contentValue);
    if (fileName !== null) {
      formData.append("file", fileName);
    }

    const data = axios({
      method: "POST",
      url: `${process.env.REACT_APP_ROUTE}/posting/post`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }).then((res) => {
      if (res.data.result == true) {
        alert(res.data.message);
        onClose();
        togglePageRender();
      } else {
        if (res.data.message == "로그인X, 레시피 정보 등록 불가!") {
          navigate("/login");
        } else {
          alert(res.data.message);
        }
      }
    });
  };
  return (
    <Container onSubmit={handleSubmit}>
      <FileUploadForm value={fileName} setValue={setFileName} />
      <TextInputForm
        placeholder="제목을 입력하세요"
        label="제목"
        value={titleValue}
        setValue={setTitleValue}
      />
      <TextareaForm
        placeholder="내용을 입력하세요"
        label="내용"
        value={contentValue}
        setValue={setContentValue}
      />
      <ButtonAtom text="업로드" buttontype="upload" type="submit" />
    </Container>
  );
}
