-- Migration: Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source TEXT,
    message TEXT NOT NULL,
    created_at INTEGER NOT NULL
);

-- Index for efficient time-window queries
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);
