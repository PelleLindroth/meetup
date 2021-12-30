import { getUserById } from '../../../../db'
import { formatDate } from '../../../../utils'
import { CommentsSectionProps } from '../../types'
import CommentForm from './components/CommentForm'
import CommentIcon from '../../../../assets/icons/chat.png'
import styles from '../../SingleMeetup.module.scss'
import { useState } from 'react'

const CommentsSection = (props: CommentsSectionProps) => {
  const { meetup, user } = props
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false)

  return (
    <section className={styles.comments}>
      <div className={styles.headerRow}>
        <img src={CommentIcon} alt="Comment icon" />
        <h3>Comments</h3>
      </div>

      {meetup.comments.length ? (
        <ul className={styles.commentList}>
          {meetup.comments.map((comment) => {
            const author = getUserById(comment.userId!)
            let signature = ''

            if (author && user && author.id === user.id) {
              signature = 'You'
            } else {
              if (author) {
                signature = `${author!.getFullName()}`
              }
            }

            return (
              <li
                title="comment"
                key={comment.id}
                className={`${styles.commentCard} ${
                  signature === 'You' && styles.you
                }`}
              >
                <p className={styles.commentText}>{comment.text}</p>
                <p className={styles.commentSignature}>
                  {author ? (
                    <em>{`${`- ${signature}`}, ${formatDate(
                      comment.submittedAt
                    )}`}</em>
                  ) : (
                    <em>{`- Anonymous, ${formatDate(comment.submittedAt)}`}</em>
                  )}
                </p>
              </li>
            )
          })}
        </ul>
      ) : (
        <p>This event has no comments yet</p>
      )}
      {showCommentForm ? (
        <CommentForm
          meetup={meetup}
          user={user}
          setShowCommentForm={setShowCommentForm}
        />
      ) : (
        <button onClick={() => setShowCommentForm(true)}>Add comment</button>
      )}
    </section>
  )
}

export default CommentsSection
