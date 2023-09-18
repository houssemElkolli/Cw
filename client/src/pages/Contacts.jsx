import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import ContactTable from "../components/ContactTable";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Contacts = () => {
    const axiosPrivate = useAxiosPrivate();
    const [numberOfPages, setNumberOfPages] = useState({});
    const [totalNumber, setTotalNumber] = useState();
    useEffect(() => {
        axiosPrivate.get("/contacts/getTotalNumber").then((res) => {
            setNumberOfPages(res.data.numberOfPages);
            setTotalNumber(res.data.totalNumber);
            console.log(res.data.totalNumber);
        });
    });
    return (
        <div>
            {numberOfPages > 0 && (
                <ContactTable
                    numberOfPages={numberOfPages}
                    totalNumber={totalNumber}
                />
            )}
        </div>
    );
};

export default Contacts;
