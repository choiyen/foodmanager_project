import React, { useState } from "react";
import { CloseButton } from "../ui/close-button";
import { Button } from "../ui/button";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadDropzone,
  FileUploadClearTrigger,
} from "../ui/file-upload";
import { FileUploadTrigger } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";

interface FileUploadFormProps {
  value: Blob | null;
  setValue: (e: Blob) => void;
}

export default function FileUploadForm({
  value,
  setValue,
}: FileUploadFormProps) {
  // const [fileName, setFileName] = React.useState<string | null>(null);

  /*
$(function () {
  $("input:file").change(function () {
    const file = document.querySelector("#represent_img").files[0];
    let imgVal = $("#represent_img").val();
    var fileReg = /(.*?)\.(gif|png|jpg|jpeg)$/;
    if (!imgVal.toLowerCase().match(fileReg)) {
      alert("지원하는 파일 확장자가 아닙니다.");
      $("#represent_img").val("");
      return;
    }
    alert("이미지 값 변경");
    $("#represent_before").attr("src", URL.createObjectURL(file));
  });
});
  */

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0].name;
      var fileReg = /(.*?)\.(gif|png|jpg|jpeg)$/;
      if (!file.toLowerCase().match(fileReg)) {
        alert("지원하는 파일 확장자가 아닙니다.");
        return;
      } else {
        setValue(event.target.files[0]);
      }
    }
  };
  return (
    <FileUploadRoot
      maxW="l"
      alignItems="stretch"
      maxFiles={1}
      border="1px solid #EBEBEB"
      marginTop="10px"
      onChange={handleFileChange}
      accept={["image/*"]}
    >
      <FileUploadTrigger width="200px" height="50px" margin="30px auto" asChild>
        <Button variant="outline" size="sm">
          <HiUpload /> Upload file
        </Button>
      </FileUploadTrigger>
      <FileUploadList />
      <FileUploadClearTrigger asChild backgroundColor="#EBEBEB">
        <CloseButton
          me="-1"
          size="xs"
          variant="plain"
          focusVisibleRing="inside"
          focusRingWidth="2px"
          pointerEvents="auto"
          color="fg.subtle"
        />
      </FileUploadClearTrigger>
    </FileUploadRoot>
  );
}
