import React from "react";
import Macos from "./Macos";

const Safari = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  (props, ref) => {
    return (
      <Macos ref={ref} {...props}>
        <Macos.LeftSide>
          <Macos.SidebarIcon />
          <Macos.ChevronLeftIcon />
          <Macos.ChevronRightIcon />
        </Macos.LeftSide>
        <Macos.MiddleSide>
          <Macos.ShieldIcon />
          <Macos.SearchBar />
        </Macos.MiddleSide>
        <Macos.RightSide>
          <Macos.UploadIcon />
          <Macos.PlusIcon />
          <Macos.CopyIcon />
        </Macos.RightSide>
      </Macos>
    );
  }
);

Safari.displayName = "Safari";
export default Safari;
