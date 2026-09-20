// Google logo icon (SVG).
function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 48 48" width="18" height="18" {...props}>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4c-7.6 0-14.1 4.3-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.4 0 10.3-2.1 14-5.5l-6.5-5.4C29.4 34.9 26.9 36 24 36c-5.3 0-9.7-3.1-11.3-7.4l-6.6 5.1C9.8 39.6 16.3 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.6l6.5 5.4C41.5 35.9 44 30.4 44 24c0-1.2-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

// GitHub logo icon (SVG).
function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.96-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.44-2.7 5.42-5.28 5.7.42.36.78 1.07.78 2.15 0 1.56-.01 2.81-.01 3.19 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  );
}

// "Continue with Google / GitHub" buttons. Display only - social login is not implemented in the backend.
export default function SocialButtons() {
  return (
    <>
      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-[12px] text-slate-400">or continue with</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-[14px] font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <GoogleIcon />
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-[14px] font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <GitHubIcon />
          GitHub
        </button>
      </div>
    </>
  );
}
