import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { getTopics } from './api/article-api';
import { useState, useEffect } from 'react';

export default function TopicNavBar() {
    const [topics, setTopics] = useState(null);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const fetchedTopics = await getTopics()
                setTopics(fetchedTopics)
            } catch (err) {
                setErr(err)
            }
        }
        fetchTopics();
    }, [])
    
    function formatString(str) {
        return str?.slice(0, 1).toUpperCase() + str?.slice(1).toLowerCase();
    }

    if (!topics) return <></>

    return (
        <Nav className="justify-content-center" activeKey="/">
            <Nav.Item>
                <Nav.Link as={Link} to="">All articles</Nav.Link>
            </Nav.Item>

            {topics.map(topic => (
                <Nav.Item key={topic.slug + Date.now()}>
                    <Nav.Link as={Link} to={`/articles?topic=${topic.slug}`}>{formatString(topic.slug)}</Nav.Link>
                </Nav.Item>
            ))}

        </Nav>
    )
}