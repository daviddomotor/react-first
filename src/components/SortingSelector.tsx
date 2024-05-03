import { FC, useState } from "react";
import * as icons from 'react-bootstrap-icons';
import { SortBy, SortData, SortDirection } from "../models/sortingData";

type IconValue = 'SortDown' | 'SortUp';

export interface SortingSelectorProps {
    updateSortingData: (sortData: SortData) => void
    sortData: SortData;
}

const SortingSelector: FC<SortingSelectorProps> = ({sortData, updateSortingData}) => {
    const [iconValue, setIconValue] = useState<IconValue>('SortUp');
    const BootstrapIcon = icons[iconValue];


    function setSortDirection() {
        const newIconValue: IconValue = iconValue === 'SortUp' ? 'SortDown' : 'SortUp'
        setIconValue(newIconValue);

        updateSortingData({
            ...sortData,
            direction: sortData.direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC
        })
    }

    function handleSelectChange(selectChangeEvent: React.ChangeEvent<HTMLSelectElement>) {
        const value = selectChangeEvent.target.value

        updateSortingData({
            ...sortData,
            sortBy: value as SortBy,
        })
    }

    return (
        <div className="d-flex justify-content-end">
            <div className="d-flex gap-2 w-25">
                <label className="text-nowrap align-content-center">Sort by</label>
                <select onChange={handleSelectChange} className="form-select" aria-label="Default select example">
                    <option value={SortBy.ALPHABETICAL}>Alphabetical</option>
                    <option value={SortBy.RATING}>Rating</option>
                    <option value={SortBy.YEAR}>Year</option>
                </select>

                <button onClick={setSortDirection} className="btn btn-primary">
                    <BootstrapIcon size={20} />
                </button>
            </div>
        </div>
    )
}

export default SortingSelector;
