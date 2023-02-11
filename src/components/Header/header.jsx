import s from "./index.module.css";
import cn from "classnames";

function Header({ user, onUpdateUser, children }) {
  const handleClickButtonEdit = (e) => {
		e.preventDefault();
		onUpdateUser({name: "Василий", about: "Ментор"})
	}
  return (
    <header className={cn(s.header, "cover")}>
      <div className="container">
        <div className={s.wrapper}>
          {children}
          
        </div>
        <div className={s.profile}>
            {user.email && <span>{user.email}</span>}
            {user.name && (
              <span>
                {user.name}: {user.about}
              </span>
            )}
            <button onClick={handleClickButtonEdit} className="btn btn_type_secondary">Изменить</button>
          </div>
      </div>
    </header>
  );
}

export default Header;
