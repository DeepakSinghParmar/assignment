import React, { useEffect, useMemo, useState } from "react";
import TabComponent from "./component/TabComponent";
import { useAlldata } from "../../redux/customHook/AllDataCustomHook";
import Header from "../header";

export default () => {
  const [activeTag, setActiveTag] = useState("resources");
  const [renderDatalist, setRenderDataList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const allData = useAlldata();

  // this useEffect run when re-rendered the component when change in allData ( data in redux )
  useEffect(() => {
    setRenderDataList(allData);
  }, [allData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTag]);

  const totalPages = Math.ceil(
    renderDatalist?.filter((itm) => itm?.tag === activeTag).length /
      cardsPerPage
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onInputChangs = (e) => {
    const value = e.target.value.toLowerCase();

    if (value?.length) {
      const filterdata = allData.filter((item) =>
        item.title.toLowerCase().includes(value)
      );

      setRenderDataList(filterdata);
    } else {
      setRenderDataList(allData);
    }
  };

  const renderPaginationData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * cardsPerPage;
    const lastPageIndex = firstPageIndex + cardsPerPage;

    return renderDatalist
      ?.filter((itm) => itm.tag === activeTag)
      ?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, activeTag, renderDatalist]);

  return (
    <>
      <div className="container">
        <Header />
        <TabComponent activeTag={setActiveTag} />

        <div className="gridContainer">
          <div class="search-bar">
            <i class="fas fa-search search-icon"></i>
            <input
              onChange={(e) => onInputChangs(e)}
              type="text"
              placeholder="Search"
            />
          </div>

          {renderPaginationData?.length ? (
            <div class="grid">
              {renderPaginationData?.map((item, index) => {
                return (
                  <div class="card" key={index}>
                    <div className="card-header">
                      <div class="card-logo">
                        <img src={item?.icon_url} />
                      </div>
                      <div className="card-title">
                        <h3>{item?.title}</h3>
                        <h5>{item?.category}</h5>
                      </div>
                    </div>

                    <div class="card-content">
                      <p class="link">{item?.link}</p>
                      <p class="description">{item?.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>No data to display</div>
          )}

          <div>
            {totalPages > 1 && (
              <ul className="pagination">
                <li className="page-item">
                  <button
                    className="page-link arrow"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <li key={pageNumber} className="page-item">
                      <button
                        className={`page-link ${
                          pageNumber === currentPage ? "active" : ""
                        }`}
                        onClick={() => paginate(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  )
                )}
                <li className="page-item">
                  <button
                    className="page-link arrow"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    &gt;
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
