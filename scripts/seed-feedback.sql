-- Seed script: 100 realistic product feedback entries
-- Varied sources, sentiments, and topics for testing the feedback dashboard

INSERT INTO feedback (source, message, created_at) VALUES
-- Performance feedback (positive)
('survey', 'The dashboard loads incredibly fast now. Great improvement over last month!', strftime('%s', 'now', '-2 hours') * 1000),
('email', 'Page load times are excellent. Whatever you did in the last update worked wonders.', strftime('%s', 'now', '-3 hours') * 1000),
('twitter', 'Wow, the new @product is blazing fast! Impressed with the speed improvements 🚀', strftime('%s', 'now', '-5 hours') * 1000),
('slack', 'Our team noticed the API response times dropped significantly. Thanks for the optimization!', strftime('%s', 'now', '-6 hours') * 1000),

-- Performance feedback (negative)
('support', 'The app is extremely slow on my iPhone 12. Takes 10+ seconds to load the main screen. Please fix immediately.', strftime('%s', 'now', '-1 hours') * 1000),
('email', 'Experiencing significant lag when switching between tabs. This needs urgent attention.', strftime('%s', 'now', '-4 hours') * 1000),
('survey', 'Reports take forever to generate. Had to wait 2 minutes for a simple monthly report.', strftime('%s', 'now', '-7 hours') * 1000),

-- Authentication issues
('support', 'Cannot login at all. Getting timeout errors every single time. This is blocking our entire team.', strftime('%s', 'now', '-30 minutes') * 1000),
('email', 'Password reset email never arrives. Ive tried 5 times in the last hour. Critical issue!', strftime('%s', 'now', '-45 minutes') * 1000),
('slack', 'SSO integration keeps failing with error code 403. Our IT team is frustrated.', strftime('%s', 'now', '-2 hours') * 1000),
('support', 'Two-factor authentication codes are expiring before I can even enter them. Need longer validity.', strftime('%s', 'now', '-8 hours') * 1000),
('email', 'Session expires too quickly. Have to re-login every 15 minutes which disrupts my workflow.', strftime('%s', 'now', '-12 hours') * 1000),

-- UI/UX positive
('survey', 'Love the new dark mode! So much easier on the eyes during late night work sessions.', strftime('%s', 'now', '-1 hours') * 1000),
('twitter', 'The redesigned interface is beautiful. Clean and intuitive. Well done team!', strftime('%s', 'now', '-9 hours') * 1000),
('email', 'Navigation is much more intuitive after the update. Found features I didnt know existed.', strftime('%s', 'now', '-14 hours') * 1000),
('survey', 'The new onboarding flow is fantastic. Got our whole team set up in under 10 minutes.', strftime('%s', 'now', '-18 hours') * 1000),

-- UI/UX negative
('support', 'Where did the export button go? Cant find it anywhere after the update. Very frustrating.', strftime('%s', 'now', '-2 hours') * 1000),
('email', 'The new color scheme has poor contrast. Hard to read for users with visual impairments.', strftime('%s', 'now', '-6 hours') * 1000),
('survey', 'Too many clicks to get to basic features now. The old design was more efficient.', strftime('%s', 'now', '-10 hours') * 1000),
('slack', 'Mobile app layout is broken on tablets. Elements overlapping everywhere.', strftime('%s', 'now', '-16 hours') * 1000),
('support', 'The font size is too small on mobile. Should improve accessibility.', strftime('%s', 'now', '-20 hours') * 1000),

-- Documentation
('email', 'Your API documentation is excellent. Best Ive seen in years. Clear examples and explanations.', strftime('%s', 'now', '-4 hours') * 1000),
('survey', 'Tutorial videos are super helpful for onboarding new team members. Keep them coming!', strftime('%s', 'now', '-11 hours') * 1000),
('slack', 'The getting started guide is outdated. Screenshots dont match the current interface.', strftime('%s', 'now', '-15 hours') * 1000),
('support', 'Cannot find documentation for the new bulk import feature. Is there a guide somewhere?', strftime('%s', 'now', '-22 hours') * 1000),
('email', 'API docs are missing examples for error handling. Would be helpful to add some.', strftime('%s', 'now', '-1 day') * 1000),

-- Feature requests
('survey', 'Would love to see a calendar integration. Syncing with Google Calendar would be amazing.', strftime('%s', 'now', '-3 hours') * 1000),
('email', 'Please add the ability to customize notification sounds. Current ones are too subtle.', strftime('%s', 'now', '-7 hours') * 1000),
('slack', 'We really need a batch delete option. Deleting items one by one is tedious.', strftime('%s', 'now', '-13 hours') * 1000),
('twitter', 'Any plans for a Linux desktop app? Would be great for our dev team @product', strftime('%s', 'now', '-19 hours') * 1000),
('support', 'Requesting webhook support for real-time integrations with our internal tools.', strftime('%s', 'now', '-25 hours') * 1000),
('survey', 'Need better filtering options in the reports section. Current filters are too basic.', strftime('%s', 'now', '-30 hours') * 1000),

-- Bug reports
('support', 'CRITICAL: Data loss when editing while offline. Lost 2 hours of work. Please fix ASAP!', strftime('%s', 'now', '-20 minutes') * 1000),
('email', 'Charts are not rendering correctly in Safari. Bars are misaligned. See attached screenshot.', strftime('%s', 'now', '-5 hours') * 1000),
('slack', 'Copy-paste doesnt work in the editor. Have to type everything manually. Very annoying.', strftime('%s', 'now', '-9 hours') * 1000),
('support', 'Notification bell shows wrong count. Says 5 notifications but only 2 are actually there.', strftime('%s', 'now', '-17 hours') * 1000),
('email', 'Search results include deleted items. Ghost entries appearing in our workspace.', strftime('%s', 'now', '-23 hours') * 1000),
('survey', 'File upload fails for PDFs larger than 5MB even though limit says 10MB.', strftime('%s', 'now', '-29 hours') * 1000),

-- Mobile experience
('survey', 'Mobile app is great! Use it every day during my commute. Very polished experience.', strftime('%s', 'now', '-2 hours') * 1000),
('twitter', 'Finally, a mobile app that doesnt drain my battery. Running smoothly on my Pixel.', strftime('%s', 'now', '-8 hours') * 1000),
('support', 'App crashes immediately on launch on Android 13. Completely unusable.', strftime('%s', 'now', '-12 hours') * 1000),
('email', 'Push notifications not working on iOS. Tried reinstalling but issue persists.', strftime('%s', 'now', '-18 hours') * 1000),
('slack', 'The mobile web version is not responsive. Buttons are cut off on smaller screens.', strftime('%s', 'now', '-24 hours') * 1000),

-- API feedback
('email', 'REST API is well-designed. Integration with our CRM took only a few hours.', strftime('%s', 'now', '-3 hours') * 1000),
('slack', 'Rate limiting is too aggressive. Were hitting limits during normal usage patterns.', strftime('%s', 'now', '-10 hours') * 1000),
('support', 'API returns 500 errors intermittently. No pattern we can identify. Logs attached.', strftime('%s', 'now', '-16 hours') * 1000),
('email', 'GraphQL endpoint would be more efficient than multiple REST calls. Consider adding?', strftime('%s', 'now', '-26 hours') * 1000),
('survey', 'Webhook payloads are missing timestamps. Need them for audit logging.', strftime('%s', 'now', '-32 hours') * 1000),

-- Customer support experience
('survey', '5 stars for customer support! Sarah resolved my issue in under 10 minutes. Fantastic!', strftime('%s', 'now', '-1 hours') * 1000),
('email', 'Response time from support has improved dramatically. Used to wait days, now hours.', strftime('%s', 'now', '-6 hours') * 1000),
('twitter', 'Shoutout to @product support team for going above and beyond. You rock!', strftime('%s', 'now', '-14 hours') * 1000),
('support', 'Waited 3 days for a response to my urgent ticket. Unacceptable for a paid plan.', strftime('%s', 'now', '-20 hours') * 1000),
('email', 'Support agent gave me incorrect information. Wasted half a day following wrong steps.', strftime('%s', 'now', '-28 hours') * 1000),

-- Pricing and billing
('survey', 'The free tier is generous. Able to fully evaluate before committing to paid plan.', strftime('%s', 'now', '-4 hours') * 1000),
('email', 'Enterprise pricing is reasonable compared to competitors. Good value overall.', strftime('%s', 'now', '-11 hours') * 1000),
('support', 'Was charged twice this month. Need immediate refund and explanation.', strftime('%s', 'now', '-15 hours') * 1000),
('slack', 'Annual billing discount should be higher. 10% isnt enough to justify paying upfront.', strftime('%s', 'now', '-21 hours') * 1000),
('survey', 'Unclear what features are included in which tier. Pricing page needs improvement.', strftime('%s', 'now', '-27 hours') * 1000),

-- Security
('email', 'Appreciate the SOC 2 compliance. Made it easy to get approval from our security team.', strftime('%s', 'now', '-5 hours') * 1000),
('survey', 'The audit log feature is exactly what we needed for compliance. Very comprehensive.', strftime('%s', 'now', '-13 hours') * 1000),
('support', 'Concerned about data encryption. Is data encrypted at rest? Cant find this info.', strftime('%s', 'now', '-19 hours') * 1000),
('slack', 'Need IP allowlisting feature for enterprise security requirements.', strftime('%s', 'now', '-25 hours') * 1000),
('email', 'Session tokens visible in URL. This is a security risk. Please fix immediately.', strftime('%s', 'now', '-31 hours') * 1000),

-- Onboarding
('survey', 'Onboarding wizard is fantastic. Had our team productive within an hour.', strftime('%s', 'now', '-2 hours') * 1000),
('email', 'Welcome email sequence was helpful without being overwhelming. Nice balance.', strftime('%s', 'now', '-8 hours') * 1000),
('twitter', 'Just signed up for @product and already in love with the onboarding experience!', strftime('%s', 'now', '-16 hours') * 1000),
('support', 'Onboarding skipped important steps. Had to figure out basic settings on my own.', strftime('%s', 'now', '-22 hours') * 1000),
('slack', 'The sample project in onboarding is outdated. Uses deprecated features.', strftime('%s', 'now', '-30 hours') * 1000),

-- Integrations
('email', 'Slack integration is seamless. Notifications appear exactly where we need them.', strftime('%s', 'now', '-3 hours') * 1000),
('survey', 'Zapier integration opened up so many automation possibilities. Game changer!', strftime('%s', 'now', '-9 hours') * 1000),
('slack', 'Jira integration is broken after their recent update. Sync is one-way only now.', strftime('%s', 'now', '-17 hours') * 1000),
('support', 'Need Salesforce integration. This is a dealbreaker for our sales team.', strftime('%s', 'now', '-23 hours') * 1000),
('email', 'GitHub integration could use improvement. PR links dont preview correctly.', strftime('%s', 'now', '-29 hours') * 1000),

-- General positive
('survey', 'Best tool weve adopted this year. Productivity increased by at least 30%.', strftime('%s', 'now', '-1 hours') * 1000),
('twitter', 'Been using @product for 6 months now. Cant imagine going back to the old way.', strftime('%s', 'now', '-7 hours') * 1000),
('email', 'Your product has become essential to our daily operations. Thank you!', strftime('%s', 'now', '-12 hours') * 1000),
('slack', 'Impressed by how much this tool has improved since we first signed up. Keep it up!', strftime('%s', 'now', '-18 hours') * 1000),
('survey', 'Recommended to 3 other teams in our company. Everyone loves it.', strftime('%s', 'now', '-24 hours') * 1000),

-- General negative
('support', 'Considering switching to a competitor. Too many issues lately. Very disappointed.', strftime('%s', 'now', '-4 hours') * 1000),
('email', 'Quality has declined noticeably in the past few months. What happened?', strftime('%s', 'now', '-10 hours') * 1000),
('survey', 'Not sure I would recommend this anymore. Basic features keep breaking.', strftime('%s', 'now', '-16 hours') * 1000),
('slack', 'Our team is frustrated. Promised features keep getting delayed.', strftime('%s', 'now', '-22 hours') * 1000),

-- Mixed feedback
('email', 'Love the features but the reliability needs serious work. Daily hiccups are draining.', strftime('%s', 'now', '-5 hours') * 1000),
('survey', 'Great concept but execution is inconsistent. Some days perfect, others nightmare.', strftime('%s', 'now', '-11 hours') * 1000),
('support', 'The core product is solid but the extras feel half-baked. Focus on polish please.', strftime('%s', 'now', '-19 hours') * 1000),
('slack', 'Desktop app is excellent, mobile app is terrible. Big gap in quality.', strftime('%s', 'now', '-26 hours') * 1000),

-- Specific feature feedback
('email', 'The new reporting dashboard is exactly what we needed. Finally proper analytics!', strftime('%s', 'now', '-2 hours') * 1000),
('survey', 'Search functionality is powerful. Found documents I forgot existed.', strftime('%s', 'now', '-8 hours') * 1000),
('twitter', 'The collaboration features in @product put Google Docs to shame. Seriously impressive.', strftime('%s', 'now', '-14 hours') * 1000),
('support', 'Calendar view is buggy. Events show up on wrong days when crossing timezones.', strftime('%s', 'now', '-20 hours') * 1000),
('email', 'Export to PDF formatting is broken. Headers cut off on every page.', strftime('%s', 'now', '-28 hours') * 1000),

-- Accessibility
('survey', 'Thank you for adding keyboard navigation. Makes a huge difference for accessibility.', strftime('%s', 'now', '-6 hours') * 1000),
('email', 'Screen reader support is much improved. Appreciate the focus on accessibility.', strftime('%s', 'now', '-13 hours') * 1000),
('support', 'Color blind mode doesnt work properly. Red/green still indistinguishable.', strftime('%s', 'now', '-21 hours') * 1000),
('slack', 'Alt text missing on most images. Accessibility audit failed because of this.', strftime('%s', 'now', '-27 hours') * 1000),

-- Reliability
('email', 'Zero downtime in the 3 months weve been using this. Reliability is excellent.', strftime('%s', 'now', '-4 hours') * 1000),
('survey', 'Status page is helpful during outages. Appreciate the transparency.', strftime('%s', 'now', '-15 hours') * 1000),
('support', 'Third outage this week. This is affecting our business operations severely.', strftime('%s', 'now', '-23 hours') * 1000),
('twitter', 'Another day, another @product outage. Getting ridiculous at this point.', strftime('%s', 'now', '-31 hours') * 1000);
