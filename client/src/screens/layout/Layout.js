import '../../App.css';
import { Outlet } from 'react-router-dom';
import { checkToken } from '../../utilities/user-service';

const Layout = ({userName, setUser, logOut, logOutIcon}) => {
  // const handleCheckToken=async()=>{

  //   const expDate = await checkToken()
  // }
  return (
    // <div className="layout">
    //   <header>
    //    {/* <h1 className="title">{userName}'s Trello board</h1>  //Will always be displayed */}

 
       
    //     {/*<div>
    //         <span className='logOut' onClick={() => {setUser(null); logOut();}}>Log {logOutIcon}</span>
    //         {/* <button onClick={handleCheckToken}>Check token exparation</button> */}{/*
    //     </div>*/}
    //   </header>
    //   <main>
    //     <Outlet />  {/* // Where the rest of our components will be displayed*/}
    //   </main>
    // </div>
    <></>
  );
};

export default Layout;

