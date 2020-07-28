import React from 'react';
import LogoImage from "../../assets/Logo/LimboStudios.svg"
import '../../App.scss';
import './Logo.scss';

export default function Logo() {
  return (
    <div className="logo">
      <img className="logo-image" src={LogoImage} alt="Limbo Productions logo."/>                
    </div>      
  )
}