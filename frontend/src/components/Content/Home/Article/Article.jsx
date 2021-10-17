import React from 'react';
import s from './Article.module.css'
import Loading from "../../../common/Loading/Loading";

const Article = (props) => {
    if (props.loading) {
        return <Loading/>
    }
    let article = props.article
    document.title = article.title + ' - МИРЭА'
    return (
        <div className={s.wrapper}>
            <img src={article.coverImage} alt=""/>
            <div>
                <div className={s.contentBlock}>
                    <h1>{article.title}</h1>
                    <div>{article.content}</div>

                </div>
                <div className={s.additionalContent}>
                    <p>{article.publishedAt}</p>
                    <div>
                        <p>{article.author} -</p>
                        <p>{article.source}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article;