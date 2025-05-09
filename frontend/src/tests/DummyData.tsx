const TestData1 = {
  datasets: [
    {
      label: "데이터 포인트",
      data: [
        { x: 10, y: 20, id: "initial-1", name: "기존 점 A", r: 6 },
        { x: 15, y: 10, id: "initial-2", name: "기존 점 B", r: 15 },
        { x: 12, y: 12, id: "initial-3", name: "기존 점 C", r: 12 },
        { x: 11, y: 19, id: "initial-4", name: "기존 점 D", r: 11 },
      ],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      pointRadius: 18,
      pointHoverRadius: 10,
    },
  ],
};
const TestData2 = [
  { id: 1, name: "잠자기" },
  { id: 2, name: "밥먹기" },
  { id: 3, name: "다시 잠자기(중요)" },
];
export { TestData1, TestData2 };
