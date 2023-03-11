import { useState,   useEffect } from 'react';
import s from "./index.module.css";
import st from "../Button/index.module.css"
import cn from "classnames";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import api from '../../Api';
import Registration from '../Registration/Registration';

function Header({ onUpdateUser, children }) {
  const { user } = useContext(UserContext);
  const [isShow, setisShow] = useState(false)
  const [nameUser, setName] = useState('')
  const [aboutUser, setAbout] = useState('')
  const handleClickButtonEdit = (e) => {
		e.preventDefault();
    setisShow(false)
		onUpdateUser({name: nameUser, about: aboutUser})
	}

  useEffect(() => {
    setName(user.name)
    setAbout(user.about)
     }, [user]);
  return (
    <header className={cn(s.header, "cover")}>
      <div className="container">
        <div className={s.wrapper}>
          {children}
          
        </div>
        {api._token ? 
        <div className={s.profile}>
        {user.email && ( isShow ?
          (<input type="text" value={nameUser} onInput={(e) => {setName(e.target.value)}}/>) :
          (<span>
            {nameUser}
          </span>)
        )}
        <span> : </span>
        {user.about && ( isShow ?
          (<input type="text" value={aboutUser} onChange={(e) => {setAbout(e.target.value)}}/>) :
          <span>
             {user.about}
          </span>
        )}
        {
          !isShow ? <button onClick={() => setisShow(true)} className={st.btn_reg}>Изменить</button> :
          <button onClick={handleClickButtonEdit} className={st.btn_reg}>Принять</button>
        }
        
      </div> :
      <div style={{height: '44px', display: "flex", alignItems: "center"}} ><Registration/></div>
        }     
      </div>
    </header>
  );
}

export default Header;
