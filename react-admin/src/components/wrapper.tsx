import React from 'react'
import Nav from './Nav'
import Menu from './Menu'
import { Navigate } from 'react-router-dom';


const Wrapper = (props: any) =>{

  const token = localStorage.getItem('token')

  // const [red, setRed] = useState(false);

  // useEffect( () => {
  //   (
  //     async () => {
  //       try {
  //         await axios.get('user', {headers: {"Authorization" : `Bearer ${token}`}});
  //       }catch (e) {
  //        setRed(true);
  //      }
  //   }
    
  //   )();
  // })

  if(!token) {
    return <Navigate to={'/login'} />

  }

    return (
      <>
        <Nav/>

        <div className="container-fluid">
            <div className="row">
                <Menu/>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    {props.children}
                </main>
            </div>
        </div>
      </>
    )

}

export default  Wrapper