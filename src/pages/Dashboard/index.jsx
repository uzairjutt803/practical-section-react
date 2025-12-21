import { Route, Routes } from "react-router-dom";
import Add from "./Add";
import EditTodo from "../Frontend/Edit";

const Dashboard = () => {
  return (
    <Routes>
      <Route index element={<Add />} /> 
      <Route path="add" element={<Add />} /> 
      <Route path="edit/:id" element={<EditTodo replace={false} />}  />
    </Routes>
  );
};

export default Dashboard;
