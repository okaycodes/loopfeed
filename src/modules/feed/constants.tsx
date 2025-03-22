import { FcBbc } from "react-icons/fc";
import { SiNewyorktimes, SiTechcrunch, SiTheguardian, SiThewashingtonpost } from "react-icons/si";

export const DEFUALT_PAGE_SIZE = 13;

export const SOURCE_LIST = [
  {
    name: "BBC",
    icon: <FcBbc />,
    code: "bbc.co.uk",
  },
  {
    name: "New York Times",
    icon: <SiNewyorktimes />,
    code: "nytimes.com",
  },
  {
    name: "TechCrunch",
    icon: <SiTechcrunch />,
    code: "techcrunch.com",
  },
  {
    name: "The Guardian",
    icon: <SiTheguardian />,
    code: "theguardian.com",
  },
  {
    name: "Washington Post",
    icon: <SiThewashingtonpost />,
    code: "washingtonpost.com",
  },
];

export const CATEGORIES_LIST = [
  { name: "Tech", code: "technology", icon: "" },
  { name: "Business", code: "business", icon: "" },
  { name: "Politics", code: "politics", icon: "" },
  { name: "Sports", code: "sport", icon: "" },
];
