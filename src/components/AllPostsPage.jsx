
import { useEffect } from 'react';
import { usePost } from '../context/PostContext';

import Feed from './feed';
import PostProtectedRoute1 from './PostProtectedRoute1';

const AllPostsPage = () => {
    const { FetchPosts } = usePost();
    useEffect(() => {
        FetchPosts({mode:"All"});
    },[]);
    return (

        <PostProtectedRoute1>

            <Feed></Feed>
        </PostProtectedRoute1>


    )

}

export default AllPostsPage;