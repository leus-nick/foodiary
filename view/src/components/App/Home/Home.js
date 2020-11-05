import { Header } from "../Header";
import { Diary } from "../Diary";
// import { DishList } from "../DishList";
import { Goal } from "../Goal";

const Home = () => {
  return (
    <>
      <Header />
      <Goal />
      <main>
        <Diary />
        {/* <DishList /> */}
      </main>
    </>
  );
};

export { Home };
