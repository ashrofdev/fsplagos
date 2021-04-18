import React from 'react';

export const PrimaryBtn = ({title, onClick}) =>
    <button onClick={onClick} className="primary_btn">{title}</button>;

export const PrimaryBtnOrange = ({title, onClick}) =>
    <button onClick={onClick} className="primary_btn_orange">{title}</button>;

export const SecondaryBtn = ({title, onClick}) =>
    <button onClick={onClick} className="secontary_btn"><span>+</span> {title}</button>;
