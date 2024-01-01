import { Input, Select } from "antd";
import React from "react";
const { Option } = Select;

function Filter({ initialFilter, filterData, setFilterData, fetchJobs }) {
  const handleChangeSearch = (e) => {
    setFilterData({ ...filterData, search: e.target.value });
  };

  const handleChangeStatus = (value) => {
    setFilterData({ ...filterData, status: value });
  };

  const resetFilter = () => {
    setFilterData(initialFilter);
    fetchJobs(true);
  };

  return (
    <div className="grid grid-cols-12 gap-4 my-4">
      <div className="col-span-6">
        <Input
          onChange={handleChangeSearch}
          value={filterData.search}
          name="search"
          placeholder="Search"
          size={"middle"}
        />
      </div>
      <div className="col-span-6">
        <Select
          className="w-full"
          defaultValue={filterData.status}
          value={filterData.status}
          size="large"
          onChange={handleChangeStatus}
        >
          <Option value="" disabled>
            Pilih Status
          </Option>
          <Option value="sent">Terkirim</Option>
          <Option value="review">Sedang Direview</Option>
          <Option value="failed">Belum Memenuhi Kriteria</Option>
          <Option value="qualify">Terkualifikasi</Option>
          <Option value="expired">Expired</Option>
        </Select>
      </div>
      <div className="col-span-6"></div>
      <div className="col-span-3">
        <button
          onClick={resetFilter}
          className="w-full bg-white border-2 border-primary py-1 rounded-lg text-primary text-lg font-bold"
        >
          Reset
        </button>
      </div>
      <div className="col-span-3">
        <button
          onClick={() => fetchJobs()}
          className="w-full bg-primary border-2 border-primary py-1 rounded-lg text-white text-lg font-bold"
        >
          Filter
        </button>
      </div>
    </div>
  );
}

export default Filter;
