import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSidebar } from "../../../ContextStore/SideBarContextSuper";
import { List } from "antd";
import PublishBtn from "./PublishBtn";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import { message, Space } from "antd";
import Divider from "@mui/material/Divider";

const ViewQuestion = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();
  const { isCollapsedSuper } = useSidebar();
  const [testDetails, setTestDetails] = useState();
  const [datas, setDatas] = useState();
  const [questions, setQuestions] = useState();

  const nav = useNavigate();

  useEffect(() => {
    const url =
      "https://660ce9c73a0766e85dbeed02.mockapi.io/api/p1/manualQuestions";
    fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        const filteredData = data.filter((item) => item.testCode == id);
        setTestDetails(filteredData[0]);
        setDatas(filteredData[0].questions);
        const f = filteredData[0].questions;
        const dataArray = Object.keys(f).map((key) => ({
          title: key,
          description: f[key],
        }));
        console.log(dataArray);
        setQuestions(dataArray);
      });
  }, []);

  const handleFirstButtonClick = () => {
    console.log("First Button Clicked", testDetails);

    const taskToUpdate = { ...testDetails };
    taskToUpdate.status = "published";

    console.log(taskToUpdate.id);
    fetch(
      `https://660ce9c73a0766e85dbeed02.mockapi.io/api/p1/manualQuestions/${taskToUpdate.id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(taskToUpdate),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log("Final updated data", data);
      });
    nav(`/super-admin/home/review-request`);
  };

  const handleSecondButtonClick = () => {
    console.log("Second Button Clicked", testDetails);
    nav(`/super-admin/home/review-request`);
  };

  const handleThirdButtonClick = () => {
    console.log("Third Button Clicked", testDetails);

    const taskToUpdate = { ...testDetails };
    taskToUpdate.status = "rejected";

    console.log(taskToUpdate.id);
    fetch(
      `https://660ce9c73a0766e85dbeed02.mockapi.io/api/p1/manualQuestions/${taskToUpdate.id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(taskToUpdate),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log("Final updated data", data);
      });
    nav(`/super-admin/home/review-request`);

    //alert
    messageApi.open({
      type: "error",
      content: "Rejected",
    });
  };

  return (
    <div
      className="pl-3 dark:bg-slate-900 dark:text-gray"
      style={{
        width: isCollapsedSuper ? `calc(100% - 80px)` : `calc(100% - 200px)`,
        marginLeft: isCollapsedSuper ? "80px" : "200px",
        height: '92.8vh',
      }}
    >
      <div className="flex flex-row justify-between mr-10">
        <div className="font-semibold text-2xl">
          <h1 className="dark:text-white">Review request/details</h1>
          <p className="dark:text-gray-400">Question ID: {id}</p>
        </div>

        <Space>
          <div className="d-flex align-items-end">
            {contextHolder}
            <PublishBtn
              onFirstButtonClick={(data) => handleFirstButtonClick(data)}
              onSecondButtonClick={(data) => handleSecondButtonClick(data)}
              onThirdButtonClick={(data) => handleThirdButtonClick(data)}
              component={CancelIcon}
            />
          </div>
        </Space>
      </div>
      <div>
        <List
          className="dark:text-white"
          itemLayout="horizontal"
          dataSource={questions}
          renderItem={(item) => (
            <List.Item className=" dark:text-gray-100">
              <List.Item.Meta
                title={<span className="dark:text-white">{item.title}</span>}
                description={<span className="dark:text-gray-400">{item.description}</span>}
                className="dark:text-white"
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ViewQuestion;
