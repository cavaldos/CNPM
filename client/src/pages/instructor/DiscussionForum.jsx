import React, { useState, useEffect, useRef } from 'react';

import DiscussionForum from '../../components/ui/Learning/DiscussionForum';
const DiscussionForumPage = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <DiscussionForum />
      </div>
    </>
  );
};

export default DiscussionForumPage;
