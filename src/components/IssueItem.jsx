import { Link } from "react-router-dom";
import { GoIssueOpened, GoIssueClosed, GoComment } from 'react-icons/go';
import { relativeDate } from '../helpers/relativeDate';
import { useUserData } from "../helpers/useUserData";

export function IssueItem({
  title,
  number,
  assignee,
  commentCount,
  createdBy,
  createdDate,
  labels,
  status,
}) {
  const assigneeUser = useUserData(assignee)
  const createdByUser = useUserData(createdBy)

  return (
    <li>
      <div>
        {status === 'done' || status === 'canceled' ? (
          <GoIssueClosed style={{ color: "red" }} />
        ) : (
          <GoIssueOpened style={{ color: "green" }} />
        )}
      </div>
      <div className="issue-content">
        <span>
          <Link to={`issue/${number}`}>{title}</Link>
          {labels.map(label => (
            <span key={label} className={`label red`}>
              {label}
            </span>
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)}{" "}
          {createdByUser.isSuccess ? `by ${createdByUser.data.name}` : ""}
        </small>
      </div>
      {assignee ?
        <img
          src={assigneeUser.isSuccess ? assigneeUser.data.profilePictureUrl : ""}
          className="assigned-to"
          alt={assigneeUser.isSuccess ? `Assigned to ${assigneeUser.data.name}` : 'Avatar'}
        /> : null}
      <span className="comment-count">
        {commentCount > 0 ? (
          <>
            <GoComment /> 
            {commentCount}
          </>
        ) : null}
      </span>
    </li>
  );
}
