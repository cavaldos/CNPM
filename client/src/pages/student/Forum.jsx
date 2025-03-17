import React, { useState, useEffect, useRef } from "react";

import LearnLayout from "../../components/ui/Learning/LearningLayout";
import DiscussionForum from "../../components/ui/Learning/DiscussionForum";
const DiscussionForumPage = () => {


    return (
        <>
            <LearnLayout>
                <div className="flex flex-col gap-4">
                    <DiscussionForum />
                </div>
            </LearnLayout>
        </>
    );
};

export default DiscussionForumPage;