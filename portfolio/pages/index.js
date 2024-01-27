import Navbar from "components/Navbar";
//import { resources } from "api/data";
import 'bulma/css/bulma.css'


function Home() {
  return (
    <>
     <Navbar />
     </>
  )
}



export async function getServerSideProps() {
  const resData = await fetch("http://localhost:3001/api/resources");
  const data = await resData.json();

  console.log(data);

  return {
    props: {
      resources: data
    }
  }
}
export default Home;