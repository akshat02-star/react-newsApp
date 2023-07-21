import React from "react";

export default function NewsItem(props) {
  let { title, description, imageUrl, author, date, source, url } = props;
  return (
    <div>
      <div className="card">
        <span
          className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
          style={{ left: "85%", zIndex: 1 }}
        >
          {source}
          <span className="visually-hidden">unread messages</span>
        </span>
        <img src={imageUrl} className="card-img-top" alt="news" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={url} className="btn btn-info btn-sm">
            Read More
          </a>
          <p className="card-text">
            <small className="text-body-secondary">
              Updated by {author} on {date}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}
