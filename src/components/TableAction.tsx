import { FC } from "react";
/* Only import the interface here. */
import { IconProps } from "react-bootstrap-icons";

import { icons } from "../utils/icons";

export interface TableActionProps extends IconProps {
  iconName: keyof typeof icons;
  action: () => void;
}

const iconStyle = {
  cursor: "pointer",
};

const TableAction: FC<TableActionProps> = ({ iconName, action, ...props }) => {
  const BootstrapIcon = icons[iconName];
  return <BootstrapIcon style={iconStyle} onClick={action} {...props} />;
};

export default TableAction;
