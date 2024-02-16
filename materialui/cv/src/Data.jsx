import React, { useEffect,useState } from "react";
import { Card, CardHeader, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import AssignmentLateRoundedIcon from "@mui/icons-material/AssignmentLateRounded";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 60,
      renderCell: (params) => {
        return (
          <Link
            style={{ color: "black", textUnderlineOffset: 5 }}
            to={`/${params.value}`}
          >
            <Typography>{params.value}</Typography>
          </Link>
        );
      },
    },
    {
      field: "userId",
      headerName: "User ID",
      width: 70,
    },
    {
      field: "todo",
      headerName: "Todo",
      width: 400,
    },
    {
      field: "completed",
      headerName: "Completed",
      width: 90,
      renderCell: (params) => {
        return params.value ? (
          <AssignmentTurnedInRoundedIcon sx={{ color: "green" }} />
        ) : (
          <AssignmentLateRoundedIcon sx={{ color: "orangered" }} />
        );
      },
    },
  ];
const Data = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setloading] = useState([]);
    useEffect(() => {
        async function fetchTodos() {
        setloading(true);
        await fetch("https://dummyjson.com/todos")
        .then((res) => (res.json()))
        .then((data) => setTodos(data.todos)) 
        .catch((err) => console.log(err))
        .finally(() => setloading(false));
    }
        fetchTodos();
        },[])
        console.log(todos);
        return (
            <Card sx={{ padding: 5 }}>
                <CardHeader title='Todo List'></CardHeader>
                <DataGrid loading={loading} sx={{ height: 500 }} columns={columns} rows={todos} />
            </Card>
        );
};

export default Data;