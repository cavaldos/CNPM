import React, { useState } from "react";
import { Card, Pagination, Rating, Stack } from "@mui/material";

const ReviewItem = ({ item }) => {
    return (
        <Card className="p-4 bg-blue-50 border border-blue-200">
            {/* <hr className="dark:border-slate-700 my-5" /> */}
            <div className="flex flex-col lg:flex-row justify-between">
                <div className="w-full lg:w-1/3">
                    <div className="flex mb-6">
                        <div className="w-10 h-10 rounded-full mr-2 overflow-hidden">
                            <img alt="" className="max-w-full h-auto" />
                        </div>
                        <div>
                            <h5 className="font-medium my-1">{item.StudentName}</h5>
                            <Rating readOnly value={item.Rating} />
                            <p className="text-sm opacity-50">Ngày đánh giá: </p>
                            <p className="font-bold mb-0">{new Date(item.ReviewDate).toLocaleString()}</p>
                            {/* <Date >{item.ReviewDate}</Date> */}
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-2/3">
                    <p className="text-base leading-normal mb-6">
                        {item.Review}
                    </p>
                </div>
            </div>
        </Card>
    );
};

const Reviews = ({ data }) => {

    const [page, setPage] = useState(1);
    const itemsPerPage = 5

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <>
            <Stack spacing={2} className="p-4">
                <h1 className="text-lg font-semibold">Đánh giá của học viên</h1>

                {(itemsPerPage > 0
                    ? data.slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage)
                    : data
                ).map((item, i) => (
                    <ReviewItem item={item} key={i} />
                ))}
            </Stack>
            <Pagination
                count={Math.ceil(data.length / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
            />
        </>
    );
};

export default Reviews;
