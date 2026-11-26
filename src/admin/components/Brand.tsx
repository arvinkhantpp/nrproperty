/** Admin login logo and nav icon: the same NR placeholder monogram as the website. */
export function Logo() {
  return (
    <span className="nr-brand">
      <span className="nr-brand__mark" aria-hidden="true">
        NR
      </span>
      <span className="nr-brand__text">
        <strong>NR PROPERTY</strong>
        <span>Admin</span>
      </span>
    </span>
  )
}

export function Icon() {
  return (
    <span className="nr-brand__mark nr-brand__mark--sm" aria-label="NR Property">
      NR
    </span>
  )
}
