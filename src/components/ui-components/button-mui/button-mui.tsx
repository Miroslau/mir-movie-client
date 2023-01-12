import React, {FC} from 'react';
import {Button} from "@mui/material";

interface DefaultProps {
    variant?: string;
    title: string;
    color?: string;
    disabled?: false;
    className?: any;
    children?: any;
    startIcon?: any;
    ariaLabel?: null;
    clickButton?: (args?: any) => void;
    size?: string;
}

const ButtonMui: FC<DefaultProps> = (props: any) => {
    const {
        variant,
        title,
        color,
        disabled,
        className,
        children,
        ariaLabel,
        startIcon,
        clickButton,
        ...other
    } = props;

    return (
        <Button
            variant={variant}
            disabled={disabled}
            color={color}
            className={className}
            sx={className}
            onClick={clickButton}
            startIcon={startIcon}
            aria-label={ariaLabel}
            {...other}
        >
            {title}
            {children || ''}
        </Button>
    );
};

export default React.memo(ButtonMui);