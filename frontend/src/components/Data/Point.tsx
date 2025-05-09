interface DataPoint {
  x: number;
  y: number;
  id: string;
  name: string;
  r?: number;
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
  datasets: Dataset[]; //나중에 또 다른 드래깅 태그 생길지도 몰라서...
}
