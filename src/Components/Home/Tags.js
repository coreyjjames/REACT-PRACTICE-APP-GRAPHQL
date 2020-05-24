import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_TAGS = gql`
    query tags {
        tags {
            tagList
        }
    }
`;


const Tags = props => {

    const { loading, error, data } = useQuery(GET_TAGS, { fetchPolicy: "cache-and-network" });

    const tags = data ? data.tags.tagList : null;

    if (tags) {
        return (
            <div className="tag-list">
                {
                    tags.map(tag => {
                        const handleClick = ev => {
                            ev.preventDefault();
                            props.onClickTag(tag);
                        };

                        return (
                            <a
                                href=""
                                className="tag-default tag-pill"
                                key={tag}
                                onClick={handleClick}>
                                {tag}
                            </a>
                        );
                    })
                }
            </div>
        );
    } else {
        return (
            <div>Loading Tags...</div>
        );
    }
}

export default Tags;