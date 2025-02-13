import React from "react";
import { Input, Grid, GridItem } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { NumberInputField, NumberInputRoot } from "../ui/number-input";

interface TextInputProps {
  placeholder1: string;
  placeholder2: string;
  label: string;
  value1: string;
  value2: string;
  setValue1: (e: string) => void;
  setValue2: (e: string) => void;
  invalid?: boolean;
  helperText?: string;
  required?: boolean;
}

export default function TwoTextInputForm({
  placeholder1,
  placeholder2,
  label,
  value1,
  value2,
  setValue1,
  setValue2,
  invalid = false,
  required = true,
}: TextInputProps) {
  return (
    <Field
      label={label}
      fontWeight="bold"
      marginBottom="20px"
      mt="20px"
      errorText={"이메일 주소에는 @가 포함되어야 합니다."}
      invalid={invalid}
      required={required}
    >
      <Grid templateColumns="1fr 1fr" gap="16px">
        <GridItem>
          <NumberInputRoot
            defaultValue="1"
            value={value1.toString()}
            onValueChange={(e) => setValue1(e.value)}
            min={1}
          >
            <NumberInputField />
          </NumberInputRoot>
        </GridItem>
        <GridItem>
          <Input
            placeholder={placeholder2}
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
          />
        </GridItem>
      </Grid>
    </Field>
  );
}
