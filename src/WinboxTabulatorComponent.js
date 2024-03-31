import React, { useRef, useEffect, useState } from "react";
import WinBox from "winbox/src/js/winbox";
import "winbox/dist/css/winbox.min.css";
import { Button } from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import "tabulator-tables/dist/css/tabulator_site_dark.css";
import { TabulatorFull as Tabulator } from "tabulator-tables";

const WinboxTabulatorComponent = () => {
  const winboxRef = useRef(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // 編集モードのステート
  // 編集モードのトグル関数
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // カスタムエディタ
  const tagEditor = (cell, onRendered, success, cancel) => {
    if (!isEditing) {
      cancel();
      return;
    }
    // エディタのUIとしてdiv要素を作成
    const editor = document.createElement("div");

    // 既存のタグを表示する関数
    function updateTagsDisplay() {
      editor.innerHTML = ""; // 既存の表示をクリア
      cell.getValue().forEach((tag) => {
        const tagSpan = document.createElement("span");
        tagSpan.textContent = tag;
        tagSpan.classList.add("tag");
        editor.appendChild(tagSpan);
      });

      editor.appendChild(input); // 入力フィールドを追加
      editor.appendChild(addButton); // 追加ボタンを追加
    }

    // タグを追加する入力フィールド
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.style.marginRight = "5px";

    // タグを追加するボタン
    const addButton = document.createElement("button");
    addButton.textContent = "+";
    addButton.onclick = () => {
      const tagValue = input.value.trim();
      if (tagValue) {
        const tags = cell.getValue();
        tags.push(tagValue);
        success(tags); // 新しいタグリストをセルに設定
        input.value = ""; // 入力フィールドをクリア
        updateTagsDisplay(); // タグの表示を更新
      }
    };

    onRendered(() => {
      input.focus();
      updateTagsDisplay(); // 初期表示
    });

    return editor;
  };

  // 修正後のカスタムフォーマッタ
  const tagFormatter = (cell) => {
    return cell
      .getValue()
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join("");
  };

  // Tabulatorの初期化部分などその他のコードは変更なし

  // スタイル（CSS）の追加が必要
  // .tag { /* タグのスタイル定義 */ }

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
        job: [faker.name.jobTitle()], // job を配列で初期化
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
        mount: document.createElement("div"),
        onclose: () => (winboxRef.current = null),
      });

      winboxRef.current = winbox;
      new Tabulator(winbox.body.appendChild(document.createElement("div")), {
        data: tableData,
        height: "500px",
        layout: "fitData",
        columns: [
          { title: "ID", field: "id", sorter: "number", headerFilter: "input" },
          { title: "Name", field: "name", headerFilter: "input" },
          { title: "Location", field: "location", headerFilter: "input" },
          {
            title: "Gender",
            field: "gender",
            headerFilter: "select",
            headerFilterParams: { values: ["male", "female", "other"] },
          },
          {
            title: "Rating",
            field: "rating",
            sorter: "number",
            headerFilter: "input",
          },
          { title: "Color", field: "col", headerFilter: "input" },
          {
            title: "Date of Birth",
            field: "dob",
            sorter: "date",
            headerFilter: "input",
          },
          { title: "Email", field: "email", headerFilter: "input" },
          { title: "Phone", field: "phone", headerFilter: "input" },
          {
            title: "Job",
            field: "job",
            editor: tagEditor,
            formatter: tagFormatter,
            headerFilter: "input",
            cellClick: (e, cell) => {
              toggleEdit();
            },
          },
          { title: "Company", field: "company", headerFilter: "input" },
          {
            title: "Height",
            field: "height",
            sorter: "number",
            headerFilter: "input",
          },
          {
            title: "Weight",
            field: "weight",
            sorter: "number",
            headerFilter: "input",
          },
          { title: "Eye Color", field: "eye_color", headerFilter: "input" },
          { title: "Hair Color", field: "hair_color", headerFilter: "input" },
          { title: "Hobbies", field: "hobbies", headerFilter: "input" },
          {
            title: "Favorite Food",
            field: "favorite_food",
            headerFilter: "input",
          },
          {
            title: "Favorite Movie",
            field: "favorite_movie",
            headerFilter: "input",
          },
          {
            title: "Education Level",
            field: "education_level",
            headerFilter: "select",
            headerFilterParams: {
              values: ["Bachelor's Degree", "Master's Degree", "PhD"],
            },
          },
          {
            title: "Languages Spoken",
            field: "languages_spoken",
            headerFilter: "input",
          },
        ],
      });
    }
  };

  useEffect(() => {
    if (winboxRef.current) {
      openWinboxWithTabulator();
    }
  }, [filterVisible, isEditing]); // 依存配列に isEditing を追加

  return (
    <div>
      <Button onClick={openWinboxWithTabulator}>
        Open Winbox with Tabulator
      </Button>
    </div>
  );
};

export default WinboxTabulatorComponent;
