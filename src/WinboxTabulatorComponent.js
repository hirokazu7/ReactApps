import React, { useRef, useEffect } from "react";
import WinBox from "winbox/src/js/winbox";
import "winbox/dist/css/winbox.min.css";
import { Button } from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import "tabulator-tables/dist/css/tabulator_midnight.min.css";
import { Tabulator } from "tabulator-tables";

const WinboxTabulatorComponent = () => {
  const winboxRef = useRef(null);

  const generateData = (numRecords) => {
    const data = [];
    for (let i = 1; i <= numRecords; i++) {
      data.push({
        id: i,
        name: faker.name.fullName(),
        location: faker.address.country(),
        gender: faker.helpers.arrayElement(["male", "female", "other"]),
        rating: faker.datatype.number({ min: 1, max: 5 }),
        col: faker.color.human(),
        dob: faker.date
          .past(50, new Date("2000-01-01"))
          .toLocaleDateString("en-GB"),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        job: faker.name.jobTitle(),
        company: faker.company.bs(), // 修正済み
        height: faker.datatype.number({ min: 150, max: 200 }),
        weight: faker.datatype.number({ min: 50, max: 100 }),
        eye_color: faker.color.human(),
        hair_color: faker.color.human(),
        hobbies: faker.random.word(),
        favorite_food: faker.random.word(),
        favorite_movie: faker.random.word(),
        education_level: faker.helpers.arrayElement([
          "Bachelor's Degree",
          "Master's Degree",
          "College Diploma",
        ]),
        languages_spoken: faker.random.words(),
      });
    }
    return data;
  };

  const tableData = generateData(50);

  const openWinboxWithTabulator = () => {
    if (!winboxRef.current) {
      const winbox = new WinBox({
        title: "Tabulator Table in WinBox",
        width: "80%",
        height: "80%",
        x: "center",
        y: "center",
        onclose: () => (winboxRef.current = null),
      });
      winboxRef.current = winbox;
      new Tabulator(winbox.body.appendChild(document.createElement("div")), {
        data: tableData,
        autoColumns: true,
        // layout: "fitColumns", // フィットカラムレイアウトを使用
        height: "500px", // 高さを500pxに設定
        virtualDomHoz: true, // 仮想DOMの水平方向のレンダリングを有効化
        headerFilter: true, // Header Filteringを有効化
      });
    }
  };

  return (
    <div>
      <Button onClick={openWinboxWithTabulator}>
        Open Winbox with Tabulator
      </Button>
    </div>
  );
};

export default WinboxTabulatorComponent;
