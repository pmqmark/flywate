import React from "react"

export type ContainerProp = {
    children?: React.ReactNode,
    className?: string
}

export type ButtonProps = {
    title: string;
    link?: string;
    className?: string;
    onClick?: () => void;
}

export type ModalWrapperProps = {
    children: React.ReactNode,
    className: string
}