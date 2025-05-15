interface DataPoint {
  x: number;
  y: number;
  id: string;
  name: string;
  r?: number; // r은 있어도 되고 없어도 됨
}

interface Dataset {
  label: string;
  data: DataPoint[];
  backgroundColor: string;
  borderColor: string;
  pointRadius: number;
  pointHoverRadius: number;
}

interface ChartData {
  datasets: Dataset[]; //datasets라는 배열이 반드시 존재해야 함함
} // 차트 데이터를 위한 타입 정의
