import React, { useState } from "react";
import styled from "styled-components";
import FileUploadForm from "../atoms/FileUploadForm";
import ThreeSelectBlockUi from "../molecules/ThreeSelectBlockUI";
import TextareaForm from "../atoms/TextareaForm";
import ButtonAtom from "../atoms/ButtonAtom";
import IngredientsList from "../molecules/IngredientsList";
import CookingSteps from "../molecules/CookingSteps";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextInputForm from "../atoms/TextInputForm";
import { usePageRender } from "./PageRenderContext"; // 작성한 PageRenderContext 파일

const Container = styled.form`
  height: 100%;
  overflow: scroll;
`;
const WrapContent = styled.div``;
export default function WriteRecipe({ onClose }: { onClose: () => void }) {
  const [titleValue, setTitleValue] = useState("");
  const [recipeData, setrecipeData] = useState({
    option1: "",
    option2: "",
    option3: "",
  });
  const [RecipeValue, setRecipeValue] = useState("");
  const [inputSets, setInputSets] = useState([{ ingreName: "", amount: "" }]);
  const [CookingStep, setCookingStep] = useState([{ stepNo: 1, content: "" }]);
  const [fileName, setFileName] = React.useState<Blob | null>(null);
  const navigate = useNavigate();
  // 컨텍스트 사용
  const { mainPageRender, setMainPageRender } = usePageRender();
  const toggleMainPageRender = () => {
    setMainPageRender((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", titleValue);
    formData.append("describe", RecipeValue);
    formData.append("level", recipeData.option3);
    formData.append("time", recipeData.option1);
    if (fileName !== null) {
      formData.append("file", fileName);
    }
    formData.append("amount", recipeData.option2);
    formData.append("steps", JSON.stringify(CookingStep));
    formData.append("Ingredients", JSON.stringify(inputSets));

    const data = axios({
      method: "POST",
      url: `${process.env.REACT_APP_ROUTE}/Recipe/insert`,
      data: {
        title: titleValue,
        describe: RecipeValue,
        level: recipeData.option3,
        time: recipeData.option1,
        amount: recipeData.option2,
        img: fileName,
        steps: CookingStep,
        Ingredients: inputSets,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }).then((res) => {
      if (res.data.result == true) {
        alert(res.data.message);
        setTitleValue("");
        setrecipeData({
          option1: "",
          option2: "",
          option3: "",
        });
        setRecipeValue("");
        setInputSets([{ ingreName: "", amount: "" }]);
        setCookingStep([{ stepNo: 1, content: "" }]);
        setFileName(null);
        onClose();
        toggleMainPageRender();
      } else {
        if (res.data.message == "로그인이 되어 있지 않습니다.") {
          navigate("/login");
        } else {
          alert("데이터 추가 도중 오류가 발생했습니다.");
        }
      }
    });
  };

  return (
    <Container onSubmit={handleSubmit}>
      <WrapContent>
        <FileUploadForm value={fileName} setValue={setFileName} />
        <TextInputForm
          placeholder="레시피 이름을 입력하세요"
          label="레시피 이름"
          value={titleValue}
          setValue={setTitleValue}
        />
        <ThreeSelectBlockUi
          title="레시피 정보"
          placeholder1="조리시간"
          placeholder2="인분 수"
          placeholder3="난이도"
          type="type2"
          values={recipeData}
          setValues={setrecipeData}
        />
        <TextareaForm
          placeholder="레시피에 대한 간단한 설명을 입력해주세요"
          label="요리 설명"
          value={RecipeValue}
          setValue={setRecipeValue}
        />
        <IngredientsList
          placeholder1="재료 이름"
          placeholder2="개수/용량"
          value={inputSets}
          setValue={setInputSets}
        />
        <CookingSteps
          placeholder="조리 방법을 입력하세요"
          value={CookingStep}
          setValue={setCookingStep}
        />
        <ButtonAtom text="업로드" buttontype="upload" type="submit" />
      </WrapContent>
    </Container>
  );
}
