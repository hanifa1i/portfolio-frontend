import Nav from "../components/navigation/Nav";
import Book from "../components/sketchbook/book/Books"
import Divider from "../components/common/Divider";

export default function SketchbooksPage() {
  return (
    <div className="sketchbookContainer">

      <div className="pageCenterer h-[100vh] w-[100vw] ">
        {/*<img src="/images/me3.jpeg" className="fixed opacity-5 top-[-500px] w-full left-1/2 -translate-x-1/2" />*/}
        <Nav/>
        <Book/>
      </div>
    </div>
  );
}
