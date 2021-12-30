import { uid } from 'uid'
import { useState } from 'react'
import { Comment } from '../../../../../db/meetups'
import { CommentFormProps } from '../../../types'
import { addComment } from '../../../../../db'
import styles from '../../../SingleMeetup.module.scss'

const CommentForm = (props: CommentFormProps) => {
  const { user, meetup, setShowCommentForm } = props
  const [commentBody, setCommentBody] = useState<string>('')

  const handleSubmitComment = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const comment: Comment = {
      id: uid(),
      userId: user ? user.id : null,
      text: commentBody,
      submittedAt: new Date(),
    }

    addComment(meetup, comment)
    setShowCommentForm(false)
  }

  return (
    <form name="comment-form" className={styles.commentForm}>
      <textarea
        value={commentBody}
        onChange={(e) => setCommentBody(e.currentTarget.value)}
        className={styles.commentTextInput}
        name="form-text"
        id="form-text"
        placeholder="Your comment..."
      />
      <div className={styles.formButtons}>
        <button
          className={styles.cancel}
          type="button"
          onClick={() => setShowCommentForm(false)}
        >
          Cancel
        </button>
        <button disabled={!commentBody.length} onClick={handleSubmitComment}>
          Submit
        </button>
      </div>
    </form>
  )
}

export default CommentForm
