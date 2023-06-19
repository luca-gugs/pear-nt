import React, { Dispatch, SetStateAction } from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
type SelectUserDocTypeProps = {
  value: string | undefined;
  setValue: Dispatch<SetStateAction<undefined>>;
};
const SelectUserDocType = ({ value, setValue }: SelectUserDocTypeProps) => {
  return (
    <Select.Root
      value={value}
      onValueChange={() => {
        console.log("HEREHEREHERE");
      }}
    >
      <Select.Trigger
        className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[20px] leading-none text-violet11 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9"
        aria-label="Food"
      >
        <Select.Value placeholder="Select a user type..." />
        <Select.Icon className="text-violet11">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-md bg-white text-[20px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[5px] text-[20px]">
            <Select.Group>
              <SelectItem className="text-[20px]" value="W2 Fixed">
                W2 Fixed
              </SelectItem>
              <SelectItem className="text-[20px]" value="W2 Variable">
                W2 Variable
              </SelectItem>
              <SelectItem className="text-[20px]" value="Self-Employed">
                Self-Employed
              </SelectItem>
              <SelectItem className="text-[20px]" value="SSI Income">
                SSI Income
              </SelectItem>
              <SelectItem className="text-[20px]" value="New Job Starting Soon">
                New Job Starting Soon
              </SelectItem>
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

// eslint-disable-next-line
const SelectItem = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => {
    return (
      <Select.Item
        className={classnames(
          // eslint-disable-next-line
          "relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-violet11 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none",
          // eslint-disable-next-line
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default SelectUserDocType;
