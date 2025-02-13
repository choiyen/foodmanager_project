import { RatingGroup } from "@chakra-ui/react";
import * as React from "react";

export interface RatingProps extends RatingGroup.RootProps {
  icon?: React.ReactElement;
  count?: number;
  label?: React.ReactNode;
  size: "sm" | "md" | "lg" | "xs" | undefined;
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  function Rating(props, ref) {
    const { icon, count = 5, label, size, ...rest } = props;
    return (
      <RatingGroup.Root ref={ref} count={count} size={size} {...rest}>
        {label && <RatingGroup.Label>{label}</RatingGroup.Label>}
        <RatingGroup.HiddenInput />
        <RatingGroup.Control>
          {Array.from({ length: count }).map((_, index) => (
            <RatingGroup.Item key={index} index={index + 1}>
              <RatingGroup.ItemIndicator
                icon={icon}
                width="40px"
                height="40px"
              />
            </RatingGroup.Item>
          ))}
        </RatingGroup.Control>
      </RatingGroup.Root>
    );
  }
);
