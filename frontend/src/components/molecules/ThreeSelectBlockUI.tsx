import React, { useMemo } from "react";
import styled from "styled-components";
import { createListCollection, Text } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";

interface ThreeSelectBlockUiProps {
  title: string;
  placeholder1: string;
  placeholder2: string;
  placeholder3: string;
  type: "type1" | "type2" | "type3";
  values: { option1: string; option2: string; option3: string };
  setValues: (date: {
    option1: string;
    option2: string;
    option3: string;
  }) => void;
}

const WrapSelect = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;
const Container = styled.div`
  margin-top: 20px;
`;

export default function ThreeSelectBlockUi({
  values,
  setValues,
  title,
  placeholder1,
  placeholder2,
  placeholder3,
  type,
}: ThreeSelectBlockUiProps) {
  const yearOptions = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        label: `${i + 1975}년`,
        value: `${i + 1975}`,
      })),
    []
  );
  const LimitYearOptions = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        label: `${i + 2024}년`,
        value: `${i + 2024}`,
      })),
    []
  );

  const monthOptions = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        label: `${i + 1}월`,
        value: `${i + 1}`,
      })),
    []
  );

  const dayOptions = useMemo(
    () =>
      Array.from({ length: 31 }, (_, i) => ({
        label: `${i + 1}일`,
        value: `${i + 1}`,
      })),
    []
  );

  const timeOptions = useMemo(
    () => [
      { label: `15분 미만`, value: `15min` },
      { label: `30분 미만`, value: `30min` },
      { label: `60분 미만`, value: `60min` },
      { label: `60분 이상`, value: `etc` },
    ],
    []
  );

  const personOptions = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        label: `${i + 1}인분`,
        value: `${i + 1}`,
      })),
    []
  );

  const levelOptions = useMemo(
    () => [
      { label: `상`, value: `상` },
      { label: `중`, value: `중` },
      { label: `하`, value: `하` },
    ],
    []
  );

  const OptionList1 = useMemo(() => {
    switch (type) {
      case "type1":
        return createListCollection({ items: yearOptions });
      case "type3":
        return createListCollection({ items: LimitYearOptions });
      default:
        return createListCollection({ items: timeOptions });
    }
  }, [type, yearOptions, timeOptions, LimitYearOptions]);

  const OptionList2 = useMemo(
    () =>
      createListCollection({
        items: type === "type2" ? personOptions : monthOptions,
      }),
    [type, monthOptions, personOptions]
  );

  const OptionList3 = useMemo(
    () =>
      createListCollection({
        items: type === "type2" ? levelOptions : dayOptions,
      }),
    [type, dayOptions, levelOptions]
  );

  return (
    <Container>
      <Text fontWeight="bold" mb="8px">
        {title}
      </Text>
      <WrapSelect>
        <SelectRoot
          collection={OptionList1}
          size="sm"
          width="240px"
          onValueChange={(value) =>
            setValues({ ...values, option1: value.value[0] })
          }
        >
          <SelectTrigger>
            <SelectValueText placeholder={placeholder1} />
          </SelectTrigger>
          <SelectContent>
            {OptionList1.items.map((item) => (
              <SelectItem item={item} key={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <SelectRoot
          collection={OptionList2}
          size="sm"
          width="240px"
          onValueChange={(value) =>
            setValues({ ...values, option2: value.value[0] })
          }
        >
          <SelectTrigger>
            <SelectValueText placeholder={placeholder2} />
          </SelectTrigger>
          <SelectContent>
            {OptionList2.items.map((item) => (
              <SelectItem item={item} key={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <SelectRoot
          collection={OptionList3}
          size="sm"
          width="240px"
          onValueChange={(value) =>
            setValues({ ...values, option3: value.value[0] })
          }
        >
          <SelectTrigger>
            <SelectValueText placeholder={placeholder3} />
          </SelectTrigger>
          <SelectContent>
            {OptionList3.items.map((item) => (
              <SelectItem item={item} key={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </WrapSelect>
    </Container>
  );
}
