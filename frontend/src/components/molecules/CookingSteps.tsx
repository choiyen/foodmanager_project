import React, { useState } from "react";
import styled from "styled-components";
import { Input, Grid, GridItem, Textarea } from "@chakra-ui/react";
import { Field } from "../ui/field";
import IconButtonAtom from "../atoms/IconButtonAtom";
interface IngredientsListProps {
  placeholder: string;
  value: { stepNo: number; content: string }[];
  setValue: (e: { stepNo: number; content: string }[]) => void;
}

const AddButton = styled(IconButtonAtom)`
  transform: translateX(-60%);
`;

const DelButton = styled(IconButtonAtom)`
  margin: 0 auto;
  width: 40px;
  height: 40px;
`;
const FlexBox = styled(GridItem)`
  display: flex;
`;
export default function CookingSteps({
  placeholder,
  value,
  setValue,
}: IngredientsListProps) {
  const addInputSet = () =>
    setValue([...value, { stepNo: value.length + 1, content: "" }]);
  const removeInputSet = (index: number) => {
    const updateInputSet = value.filter((_, i) => i !== index);
    setValue(updateInputSet);
  };
  return (
    <Field
      label="조리 순서"
      fontWeight="bold"
      marginTop="50px"
      marginBottom="300px"
      required
    >
      <AddButton
        icontype="plus"
        variant="ghost"
        label="리스트 추가 버튼"
        BGcolor="transparent"
        size="30px"
        onClick={addInputSet}
        position="absolute"
        left="50%"
        bottom="-50px"
      />
      <Grid templateColumns="1fr 9fr 1fr" gap="10px">
        {value.map((inputSets, index) => (
          <React.Fragment key={index}>
            <GridItem alignSelf="center">{index + 1}.</GridItem>
            <GridItem>
              <Textarea
                placeholder={placeholder}
                value={value[index].content}
                variant="outline"
                onChange={(e) => {
                  const updateValue = [...value];
                  updateValue[index].content = e.target.value;
                  setValue(updateValue);
                }}
                height="80px"
              />
            </GridItem>
            <FlexBox>
              <DelButton
                icontype="trash"
                variant="ghost"
                label="리스트 추가 버튼"
                BGcolor="transparent"
                size="28px"
                onClick={() => removeInputSet(index)}
              />
            </FlexBox>
          </React.Fragment>
        ))}
      </Grid>
    </Field>
  );
}
