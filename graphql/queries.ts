import { gql } from "@apollo/client";

export const GET_SUBREDDIT_BY_TOPIC = gql`
    query MyQuery(
        $topic: String!
    ) {
        getSubredditListByTopic(
            topic: $topic
        ) {
            id
            topic
            created_at
        }
    }
`

export const GET_ALL_POSTS = gql`
    query MyQuery{
        getPostList{
            body
            id
            created_at
            image
            subreddit_id
            title
            username
            subreddit {
            created_at
            id
            topic
            }
            votes {
            created_at
            id
            post_id
            upvote
            username
            }
            comments {
            id
            created_at
            post_id
            username
            text
            }
        }
    }
`
export const GET_POSTS_BY_TOPIC = gql`
    query MyQuery($topic : String!){
        getPostListByTopic(topic : $topic){
            body
            id
            created_at
            image
            subreddit_id
            title
            username
            subreddit {
            created_at
            id
            topic
            }
            votes {
            created_at
            id
            post_id
            upvote
            username
            }
            comments {
            id
            created_at
            post_id
            username
            text
            }
        }
    }
`
export const GET_POST_BY_POST_ID = gql`
    query MyQuery($post_id : ID!){
        getPostByPostId(post_id: $post_id) {
            body
            created_at
            id
            image
            subreddit_id
            title
            username
            subreddit {
            created_at
            id
            topic
            }
            votes {
            created_at
            id
            post_id
            upvote
            username
            }
            comments {
            created_at
            id
            post_id
            text
            username
            }
        }
    }
`