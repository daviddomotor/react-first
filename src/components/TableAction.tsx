import { FC } from "react";
import * as icons from 'react-bootstrap-icons';

export interface TableActionProps extends icons.IconProps {
    iconName: keyof typeof icons;
    action: () => void,
}

const iconStyle = {
    cursor: 'pointer',
}

const TableAction: FC<TableActionProps> = ({iconName, action, ...props}) => {
    const BootstrapIcon = icons[iconName];
    return <BootstrapIcon style={iconStyle} onClick={action} {...props} />;
}

export default TableAction;