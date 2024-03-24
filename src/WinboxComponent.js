import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Button, Select } from "@chakra-ui/react";
import "@chakra-ui/react"; // 必要に応じてインポート

const WinboxComponent = () => {
  const [portalContainer, setPortalContainer] = useState(null);
  const winboxContainerRef = useRef(null);

  const openWinbox = () => {
    if (window.WinBox && !portalContainer) {
      // WinBox ウィンドウのコンテンツ用の一時的な div 要素を作成
      const div = document.createElement("div");
      winboxContainerRef.current = div;

      // WinBox ウィンドウを作成
      new window.WinBox({
        title: "My Winbox",
        mount: winboxContainerRef.current, // この div をマウントポイントとして設定
        width: "400px",
        height: "400px",
        x: "center",
        y: "center",
        onclose: () => setPortalContainer(null),
      });

      // React ポータルのコンテナとして div をセット
      setPortalContainer(div);
    }
  };

  return (
    <div>
      <Button onClick={openWinbox}>Open Winbox</Button>
      {portalContainer &&
        ReactDOM.createPortal(
          <div>
            <Button colorScheme="blue">Chakra Button</Button>
            <Select placeholder="Select option">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </div>,
          portalContainer
        )}
    </div>
  );
};

export default WinboxComponent;
// import React, { useEffect } from "react";

// const WinboxComponent = () => {
//   useEffect(() => {
//     // 既に WinBox がロードされているかをチェック
//     if (window.WinBox) {
//       return; // WinBox が既にあれば何もしない
//     }

//     const script = document.createElement("script");
//     script.src = "/js/winbox.bundle.min.js"; // public/js に配置した場合のパス
//     script.async = true;
//     script.onload = () => {
//       // スクリプトがロードされた後、WinBox を使用できる
//       console.log("WinBox script loaded");
//     };

//     document.body.appendChild(script);

//     // スクリプトを削除するクリーンアップ関数
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const openWinbox = () => {
//     // スクリプトロード完了を確認
//     if (window.WinBox) {
//       const winbox = new window.WinBox({
//         title: "My Winbox",
//         html: "<h1>Hello from Winbox!</h1>",
//         width: "400px",
//         height: "400px",
//         x: "center",
//         y: "center",
//       });
//     } else {
//       console.error("WinBox is not loaded yet.");
//     }
//   };

//   return <button onClick={openWinbox}>Open Winbox</button>;
// };

// export default WinboxComponent;
