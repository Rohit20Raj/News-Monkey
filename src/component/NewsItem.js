import React, { Component } from 'react';

export class NewsItem extends Component {
    getCurrentDate(publishedAt) {
        let datePublished = new Date(publishedAt).getDate();
        let hourPublished = new Date(publishedAt).getHours();
        let currDate = new Date().getDate();
        let currHour = new Date().getHours();
        let dateDiff = currDate - datePublished;
        if (datePublished === currDate) {
            let hourDiff = currHour - hourPublished;
            return hourDiff + " hrs ago";
        }
        if (dateDiff === 1 && ((24 - hourPublished + currHour) <= 24)) {
            let hourDiff = 24 - hourPublished + currHour;
            return hourDiff + " hrs ago";
        }
        return dateDiff + " day ago";
    }

    render() {
        let { title, description, urlToImage, url, author, publishedAt, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                <span className="badge rounded-pill bg-danger" style={{
                        position: 'absolute',
                        zIndex: '1',
                        right: '0',
                        top: '-2%'
                    }}>
                    {source}
                </span>
                    <img src={urlToImage} className="card-img-top" alt={title} />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a href={url} target='_blank' rel="noreferrer" className='btn btn-sm btn-dark'>Read more</a>
                    </div>
                    <div className="card-footer text-body-secondary">
                        {!author ? "Unknown" : author} - {this.getCurrentDate(publishedAt)}
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsItem;
