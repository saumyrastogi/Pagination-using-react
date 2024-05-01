import { useState, useEffect } from "react";
import './styles.css';

const PaginationList = ({ list }) => {
    const [currPage, setCurrPage] = useState(0);
    const [initial, setInitial] = useState(true);
    const [currList, setCurrList] = useState([]);
    const [pageLink, setPageLink] = useState([]);
    const [currPageLink, setCurrPageLink] = useState([]);
    const pageLinkLength = pageLink.length;
    const showNext = currPage < pageLink[pageLinkLength - 1] - 1;
    const showPrev = currPage > 0;

    useEffect(() => {
        const pageLinkArr = [];
        for (let i = 0; i < list.length / 5; i++) {
            pageLinkArr.push(i + 1);
        }
        setPageLink(pageLinkArr);
        setCurrPageLink(pageLinkArr.slice(0, 3));
    }, []);

    useEffect(() => {
        setCurrList(list.slice(currPage * 5, currPage * 5 + 5));
        let currPageArr = [];
        if (currPage == 0 && !initial) {
            currPageArr = pageLink.slice(0, 3);
            setCurrPageLink(currPageArr);
        }
        else if (currPage == pageLinkLength - 1) {
            currPageArr = pageLink.slice(pageLinkLength - 3, pageLinkLength);
            setCurrPageLink(currPageArr);
        }
        else if (currPage > 0 && currPage < pageLink[pageLinkLength - 1]) {
            currPageArr = pageLink.slice(currPage - 1, currPage + 2);
            setCurrPageLink(currPageArr);
        }
    }, [currPage]);

    const handleLinkClick = (pageNumber) => {
        if (initial)
            setInitial(false);
        setCurrPage(pageNumber - 1);
    }
    return (
        <div>
            <div className="list">{currList.map(item => <h2>{item}</h2>)}</div>
            <div className="link">
                <h3
                    className={showPrev ? null : "hidden"}
                    onClick={() => handleLinkClick(currPage)}
                >
                    {'<<'}
                </h3>
                {
                    currPageLink.map(item => <h3
                        className={currPage == item - 1 ? "active" : "inactive"}
                        onClick={() => handleLinkClick(item)}>
                        {item}
                    </h3>)
                }
                <h3
                    className={showNext ? null : "hidden"}
                    onClick={() => handleLinkClick(currPage + 2)}
                >
                    {'>>'}
                </h3>
            </div>
        </div >
    );
}
export default PaginationList;