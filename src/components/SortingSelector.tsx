import { FC, useState } from "react";
/* Replaced the bootstrap icons import with an util object. */
import { icons } from "../utils/icons";

import {
  SortBy,
  SortDataModel,
  SortDirection,
} from "../models/sortingData.model";
import Button from "./Button";

type IconValue = "SortDown" | "SortUp";

export interface SortingSelectorProps {
  updateSortingData: (sortData: SortDataModel) => void;
  sortData: SortDataModel;
}

const SortingSelector: FC<SortingSelectorProps> = ({
  sortData,
  updateSortingData,
}) => {
  const [iconValue, setIconValue] = useState<IconValue>("SortUp");
  const BootstrapIcon = icons[iconValue];

  /* Let's use arrow function here */
  const setSortDirection = () => {
    const newIconValue: IconValue =
      iconValue === "SortUp" ? "SortDown" : "SortUp";
    setIconValue(newIconValue);

    updateSortingData({
      ...sortData,
      direction:
        sortData.direction === SortDirection.ASC
          ? SortDirection.DESC
          : SortDirection.ASC,
    });
  };

  const handleSelectChange = (
    selectChangeEvent: React.ChangeEvent<HTMLSelectElement>
  ) => {
    /* We can use destructuring here. */
    const { value } = selectChangeEvent.target;

    updateSortingData({
      direction: SortDirection.DESC,
      sortBy: value as SortBy,
    });
  };

  return (
    <div className="d-flex justify-content-end">
      <div className="d-flex gap-2 w-25">
        <label className="text-nowrap align-content-center">Sort by</label>
        <select
          onChange={handleSelectChange}
          className="form-select"
          aria-label="Default select example"
          // Added a default value, so when we navigate or refresh the page, the correct default option can be shown.
          defaultValue={sortData.sortBy}
        >
          <option value={SortBy.ALPHABETICAL}>Alphabetical</option>
          <option value={SortBy.RATING}>Rating</option>
          <option value={SortBy.YEAR}>Year</option>
        </select>
        {/* Let's use our own Button component here. */}
        <Button clickHandler={setSortDirection} className="btn btn-primary">
          <BootstrapIcon size={20} />
        </Button>
      </div>
    </div>
  );
};

export default SortingSelector;
