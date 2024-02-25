export interface IChartData {
  date: string;
  value: number;
}

export enum PRESET {
  ACTIVE = "active",
  GENERAL = "general",
}

export enum CHART_COLOR_PRESET {
  BLUE = "blue",
  GREY = "grey",
}
export interface IChartProps {
  chartColorPreset: CHART_COLOR_PRESET;
  data: IChartData[];
  label: string;
  preset: PRESET;
}
