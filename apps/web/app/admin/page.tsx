import Filters from "../components/Filters";
import SearchForm from "../components/SearchForm";
import TestListCards from "../components/TestListCards";

const Admin = () => {
  const data = [
    {name:"Daily-Test-1",date:'27/09/23'},
    {name:"Daily-Test-1",date:'28/09/23'},
    {name:"Daily-Test-1",date:'28/09/23'},
    {name:"Daily-Test-1",date:'28/09/23'},
    {name:"Daily-Test-1",date:'28/09/23'},
    {name:"Daily-Test-1",date:'28/09/23'},
    {name:"Daily-Test-1",date:'28/09/23'},
    {name:"Daily-Test-1",date:'28/09/23'},

  ]
  return (
    <div className="">
      <title>Admin Dashboard | SR Engine</title>
      <section className="px-[4rem] max-md:p-0 my-[1rem] w-full">
        <div className="flex-center relative min-h-[274px] w-full flex-col rounded-xl bg-[url('https://cdn.pixabay.com/photo/2014/12/27/16/38/planet-581239_1280.jpg')] bg-cover bg-center text-center">
          <h1 className="max-sm:text-xl text-5xl mb-6 p-2 text-center text-white font-bold">Simplifying Visualization</h1>
        </div>
        <SearchForm />
      </section>
      <Filters/>
      <div className="h-8"/>
      <TestListCards data={data}/>

      </div>
  );
};

export default Admin;
