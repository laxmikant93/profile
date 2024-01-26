import Navbar from "components/Navbar";
import Tab from "components/Tab";
import { resources } from "api/data";
function Home() {
  return (
    <>
     <Navbar />
     { JSON.stringify(resources) }
     <Tab />
     </>
  )
}
export default Home;