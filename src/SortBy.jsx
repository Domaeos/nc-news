
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function SortBy({ type, setCollection, isLoading }) {

    const [currentSort, setCurrentSort] = useState("Date")
    const [currentOrder, setCurrentOrder] = useState("Descending")
    const articleSorts = {
        Date: "created_at",
        Comments: "comment_count",
        Votes: "votes"
    }

    useEffect(() => {
        const sortProperty = articleSorts[currentSort]
        setCollection((collection) => {
            if (currentOrder === "Ascending") {
                const sortedCollection = [...collection].sort((a, b) => {
                    if (sortProperty === "created_at") {
                        return a.created_at.localeCompare(b.created_at)
                    } else {
                        return +a[sortProperty] > +b[sortProperty]
                    }
                })
                return sortedCollection;
            } else {
                const sortedCollection = [...collection].sort((a, b) => {
                    if (sortProperty === "created_at") {
                        return b.created_at.localeCompare(a.created_at)
                    } else {
                        return +a[sortProperty] < +b[sortProperty]
                    }
                })
                return sortedCollection;
            }
        })
    }, [currentOrder, currentSort, isLoading])

    if (isLoading) return (
        <DropdownButton size="sm" disabled={true} id="dropdown-sort-by" title={`Sort by: ${currentSort}`}>
        </DropdownButton>
    )

    return (
        <article className="article-sort-by-section">
                <Dropdown className="d-inline mx-1">
                    <Dropdown.Toggle size="sm" id="dropdown-autoclose-false">
                        {`Sort by: ${currentSort}`}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {type === "articles" && Object.keys(articleSorts).map((sortBy, index) => {
                            return (
                                <Dropdown.Item as={Button} onClick={(e) => {
                                    setCurrentSort(e.target.id);
                                }} id={sortBy} key={sortBy + index}>{sortBy}</Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="d-inline mx-1">
                    <Dropdown.Toggle size="sm" id="dropdown-autoclose-false">
                        Order by: {currentOrder}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item as={Button} onClick={() => {
                            if (currentOrder !== "Ascending") {
                                setCurrentOrder("Ascending")
                            }
                        }}>Ascending</Dropdown.Item>
                        <Dropdown.Item as={Button} onClick={() => {
                            if (currentOrder !== "Descending") {
                                setCurrentOrder("Descending");
                            }
                        }}>Descending</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
        </article>
    )
}