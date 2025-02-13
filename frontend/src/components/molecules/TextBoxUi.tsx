import React from "react";
import HeadingAtom from "../atoms/HeadingAtom";
import TextboxAtom from "../atoms/TextboxAtom";

interface TextBoxUiProps {
  text: string;
}

export default function TextBoxUi({ text }: TextBoxUiProps) {
  return (
    <div>
      <HeadingAtom level={3} color="#121212">
        {text}
      </HeadingAtom>
      <TextboxAtom />
    </div>
  );
}
