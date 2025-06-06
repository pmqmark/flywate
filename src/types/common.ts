import React from "react"

export type ContainerProp = {
    children?: React.ReactNode,
    className?: string
}

export type ButtonProps = {
    title: string;
    link: string;
    className?: string;
}

export type ModalWrapperProps = {
    children: React.ReactNode,
    className: string
}