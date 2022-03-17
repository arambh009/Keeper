import React from 'react'
import logo from '../../images/notepad.png'
import classes from './Logo.module.css'
export default function Logo() {
  return (
    <div className={classes.logo}>
        <img src={logo} alt='Logo' />
        <h2>Note-Buddy</h2>
    </div>
  )
}
