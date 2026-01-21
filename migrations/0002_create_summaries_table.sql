-- Migration: Create summaries table for caching AI-generated feedback summaries
CREATE TABLE IF NOT EXISTS summaries (
    window TEXT PRIMARY KEY,
    generated_at INTEGER NOT NULL,
    feedback_count INTEGER NOT NULL,
    summary_json TEXT NOT NULL
);
