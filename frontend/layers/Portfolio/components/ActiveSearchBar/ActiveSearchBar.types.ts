export interface ISearchActive {
  icon: string;
  name: string;
  ticker: string;
}

export interface IActiveSearchBarProps {
  activeName: string | null;
  actives: ISearchActive[];
  loading: boolean;
}

export interface IActiveSearchBarEmits {
  (e: "update:activeName", value: string): void;
}
