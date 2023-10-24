import ArticleGrid from "./ArticleGrid";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, Route, Routes } from 'react-router-dom';
import SingleArticle from "./SingleArticle";

export default function DisplayArticles() {
    return (
        <Routes>
            <Route path="/" element={<ArticleGrid />} />
            <Route path="/:articleID" element={<SingleArticle />} />
        </Routes>
    )
}
