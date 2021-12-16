import { getUserById } from '../../../db'
import { formatDate } from '../../../utils'
import { CommentsSectionProps } from '../types'
import CommentIcon from '../../../assets/icons/chat.png'
import styles from '../SingleMeetup.module.scss'

const CommentsSection = (props: CommentsSectionProps) => {
  const { meetup, user } = props

  return (
    <section className={styles.comments}>
      <div className={styles.commentHeaderRow}>
        <img src={CommentIcon} alt="Comment icon" />
        <h3>Comments</h3>
      </div>

      {meetup.comments.length ? (
        <ul className={styles.commentList}>
          {meetup.comments.map((comment) => {
            const author = getUserById(comment.userId)

            return (
              <li
                title="comment"
                key={comment.id}
                className={styles.commentCard}
              >
                <p className={styles.commentText}>{comment.text}</p>
                <p className={styles.commentSignature}>
                  <em>{`${`- ${author?.firstName} ${author?.lastName}`}, ${formatDate(
                    comment.submittedAt
                  )}`}</em>
                </p>
              </li>
            )
          })}
        </ul>
      ) : (
        <p>This event has no comments yet</p>
      )}
      {user && user.attended.includes(meetup.id) && (
        <button>Add comment</button>
      )}
    </section>
  )
}

export default CommentsSection
